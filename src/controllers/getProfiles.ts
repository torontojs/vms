import type { Context } from 'hono';
import profiles from '../data/profiles.json';
import { StatusCodes } from '../utils/status-codes.ts';

export const getAllProfiles = (context: Context) => context.json(profiles, StatusCodes.OKAY);

export const getProfileById = (context: Context) => {
	const id = context.req.param('id');
	const profile = profiles.find((currentProfile) => currentProfile.id === id);

	if (!profile) {
		return context.json({ error: 'Profile not found' }, StatusCodes.NOT_FOUND);
	}

	return context.json(profile, StatusCodes.OKAY);
};
