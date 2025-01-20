import type { Context } from 'hono';
import { StatusCodes } from '../constants/status-codes.ts';

export const getProfileById = async (context: Context<EnvironmentBindings>) => {
	const userId = context.req.param('id');
	try {
		const { results } = await context.env.database
			.prepare('SELECT * FROM profile WHERE id = ?')
			.bind(userId)
			.run();
		return context.json(results);
	} catch (err) {
		return context.json({ error: err.message }, StatusCodes.NOT_FOUND);
	}
};

export const getAllProfiles = async (context: Context) => {
	try {
		const { results } = await context.env.database
			.prepare('SELECT * FROM profile')
			.all();
		return context.json(results);
	} catch (err) {
		return context.json({ error: err.message }, StatusCodes.NOT_FOUND);
	}
};
