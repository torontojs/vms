import type { Context } from 'hono';
import { z, ZodError } from 'zod';
import { insertProfile } from '../routes/profile/data.ts';
import { StatusCodes } from '../utils/responses.ts';

const CreateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, 'Name must be at least one character long'),
	email: z
		.string({ required_error: 'Email is required' })
		.email('Invalid Email'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, 'Password must be at least one character long'),
	happenedAt: z
		.string({ required_error: 'HappenedAt is required' })
		.datetime('HappenedAt should be ISO date string format'),
	description: z.string().optional(),
	links: z.string().url('Invalid url').optional()
});

type CreateProfileRequestBody = z.infer<typeof CreateProfileSchema>;

export async function createProfile(context: Context<EnvironmentBindings>) {
	const body: CreateProfileRequestBody = await context.req.json();

	try {
		const parsedBody = CreateProfileSchema.parse(body);
		const { success, id } = await insertProfile({
			payload: parsedBody,
			database: context.env.database
		});

		if (!success) {
			throw new Error('Insertion failed');
		}

		return context.json(
			{ message: 'Profile created successfully', createdId: id },
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
