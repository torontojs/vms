import { Hono } from 'hono';
import { StatusCodes, type StatusResponse } from '../../utils/responses.ts';
import { IdSchema } from '../../utils/validation.ts';
import { deleteProfileById, getAllProfiles, getProfileById } from './data.ts';

export const profileRoutes = new Hono<EnvironmentBindings>();

profileRoutes.get('/:id', async (context) => {
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

profileRoutes.get('/', async (context) => {
	try {
		const profiles = await getAllProfiles(context.env.database);

		return context.json(profiles);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

profileRoutes.delete('/:id', async (context) => {
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
