import { Context } from 'hono';
import profiles from '../data/profiles.json';

export const getAllProfiles = (c: Context) => {
	return c.json(profiles, 200);
};

export const getProfileById = (c: Context) => {
	const id = c.req.param('id');
	const profile = profiles.find((p) => p.id === id);
	if (!profile) {
		return c.json({ error: 'Profile not found' }, 404);
	}
	return c.json(profile, 200);
};
