import type { Context } from 'hono';
import { StatusCodes } from 'src/constants/status-codes';
import { insertProfile } from 'src/db/profile';
import { z, ZodError } from 'zod';

const CreateProfileSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Invalid Email'),
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, 'Name should me 1 or more characters'),
	description: z.string().optional(),
	happenedAt: z
		.string({ required_error: 'HappenedAt is required' })
		.datetime('HappenedAt should be ISO date string format'),
	links: z.string().url('Invalid url').optional()
});

type CreateProfileRequestBody = z.infer<typeof CreateProfileSchema>;

export async function createProfile(context: Context<EnvironmentBindings>) {
	const body: CreateProfileRequestBody = await context.req.json();

	try {
		const parsedBody = CreateProfileSchema.parse(body);
		const { success, meta } = await insertProfile({
			payload: parsedBody,
			database: context.env.database
		});

		if (!success) {
			throw new Error('Insertion failed');
		}

		return context.json(
			{ message: 'Profile created successfully', createdId: meta.last_row_id },
			StatusCodes.CREATED
		);
	} catch (error) {
		if (error instanceof ZodError) {
			return context.json(
				{
					err: error.issues.map((issue) => issue.message).join(', ')
				},
				StatusCodes.BAD_REQUEST
			);
		}

		return context.json(
			{ err: error.message },
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
