import { type Context, Hono } from 'hono';
import { ZodError } from 'zod';
import { IdSchema } from '../../utils/id-validation.ts';
import { StatusCodes, type StatusResponse } from '../../utils/responses.ts';
import { validateProfileId } from '../../validator/profile.ts';
import { deleteProfileById, getAllProfiles, getProfileById, insertProfile, updateProfile } from './data.ts';
import { type CreateProfileRequestBody, CreateProfileSchema, type UpdateProfileRequestBody, UpdateProfileSchema } from './validation.ts';

export const profileRoutes = new Hono();

profileRoutes.get('/:id', async (context: Context<EnvironmentBindings>) => {
	try {
		const { success: isValidProfileId, data: profileId } = IdSchema.safeParse(context.req.param('id'));

		if (!isValidProfileId) {
			return context.json<StatusResponse>({ message: 'Invalid Profile ID' }, StatusCodes.BAD_REQUEST);
		}

		const profile = await getProfileById(context.env.database, profileId);

		if (!profile) {
			return context.json<StatusResponse>({ message: 'Profile not found' }, StatusCodes.NOT_FOUND);
		}

		return context.json(profile);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

profileRoutes.get('/', async (context: Context<EnvironmentBindings>) => {
	try {
		const profiles = await getAllProfiles(context.env.database);

		return context.json(profiles);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

profileRoutes.delete('/:id', async (context: Context<EnvironmentBindings>) => {
	try {
		const { success: isValidProfileId, data: profileId } = IdSchema.safeParse(context.req.param('id'));

		if (!isValidProfileId) {
			return context.json<StatusResponse>({ message: 'Invalid Profile ID' }, StatusCodes.BAD_REQUEST);
		}

		const isDeleted = await deleteProfileById(context.env.database, profileId);

		if (!isDeleted) {
			return context.json<StatusResponse>({ message: 'Profile not deleted' }, StatusCodes.FORBIDDEN);
		}

		return context.json({ message: 'Profile deleted successfully' }, StatusCodes.OKAY);
	} catch (err) {
		return context.json({ error: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

profileRoutes.post('/', async (context: Context<EnvironmentBindings>) => {
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
			return context.json<StatusResponse>(
				{ message: error.issues.map((issue) => issue.message).join(', ') },
				StatusCodes.BAD_REQUEST
			);
		}

		return context.json<StatusResponse>(
			{ message: error.message },
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
});

profileRoutes.patch('/:id', async function updateProfileById(context: Context<EnvironmentBindings>) {
	const body: UpdateProfileRequestBody = await context.req.json();
	let parsedBody;

	try {
		parsedBody = UpdateProfileSchema.parse(body);
	} catch (error) {
		console.log(error);
		return context.json<StatusResponse>(
			{
				message: (error as ZodError).issues
					.map((issue) => issue.message)
					.join(', ')
			},
			StatusCodes.BAD_REQUEST
		);
	}

	const totalFieldsToUpdate = Object.keys(parsedBody).length;
	/**  Body only has happenedAt */
	if (totalFieldsToUpdate <= 1) {
		return context.json<StatusResponse>(
			{ message: 'No fields to update' },
			StatusCodes.BAD_REQUEST
		);
	}

	const profileId = context.req.param('id');
	const isProfileIdValid = await validateProfileId({
		id: profileId,
		database: context.env.database
	});

	if (!isProfileIdValid) {
		return context.json<StatusResponse>(
			{ message: 'Profile id is not found' },
			StatusCodes.NOT_FOUND
		);
	}

	try {
		const { success } = await updateProfile({
			id: profileId,
			data: parsedBody,
			database: context.env.database
		});

		if (!success) {
			throw new Error('Update Failed');
		}

		return context.json<StatusResponse>(
			{ message: 'Profile updated successfully' },
			StatusCodes.OKAY
		);
	} catch (error) {
		console.log(error);
		return context.json<StatusResponse>(
			{ message: error.meesage },
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
});
