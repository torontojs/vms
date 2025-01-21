import type { Context } from 'hono';
import type { ZodError } from 'zod';
import { z } from 'zod';

import { StatusCodes } from '../constants/status-codes';
import { updateProfile } from '../db/profile';
import { validateProfileId } from '../validator/profile';

const UpdateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, 'Name should me 1 or more characters')
		.optional(),
	description: z.string().optional(),
	happenedAt: z
		.string({ required_error: 'HappenedAt is required' })
		.datetime('HappenedAt should be ISO date string format'),
	links: z.string().url('Invalid url').optional()
});

type UpdateProfileRequestBody = z.infer<typeof UpdateProfileSchema>;

export async function updateProfileById(context: Context<EnvironmentBindings>) {
	const body: UpdateProfileRequestBody = await context.req.json();
	let parsedBody;
	try {
		parsedBody = UpdateProfileSchema.parse(body);
	} catch (error) {
		console.log(error);
		return context.json(
			{
				err: (error as ZodError).issues
					.map((issue) => issue.message)
					.join(', ')
			},
			StatusCodes.BAD_REQUEST
		);
	}

	const totalFieldsToUpdate = Object.keys(parsedBody).length;
	/**  Body only has happenedAt */
	if (totalFieldsToUpdate <= 1) {
		return context.json(
			{
				message: 'No fields to update'
			},
			StatusCodes.BAD_REQUEST
		);
	}

	const profileId = context.req.param('id');
	const isProfileIdValid: boolean = await validateProfileId({
		id: profileId,
		database: context.env.database
	});

	if (!isProfileIdValid) {
		return context.json(
			{
				message: 'Profile id is not found'
			},
			StatusCodes.NOT_FOUND
		);
	}

	try {
		const { success } = await updateProfile({
			payload: {
				id: profileId,
				...parsedBody
			},
			database: context.env.database
		});

		if (!success) {
			throw new Error('Update Failed');
		}

		return context.json(
			{
				message: 'Profile updated successfully'
			},
			StatusCodes.OKAY
		);
	} catch (error) {
		console.log(error);
		return context.json(
			{
				error: error.meesage
			},
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}
