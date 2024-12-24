import type { Context } from 'hono';
import { StatusCodes } from '../../constants/status-codes.ts';

export const deleteProfileById = async (
	context: Context<EnvironmentBindings>
) => {
	const userId = context.req.param('id');

	try {
		const { results } = await context.env.database
			.prepare('DELETE FROM profile WHERE id = ?')
			.bind(userId)
			.run();
		return context.json(results);
	} catch (error) {
		return context.json({ err: error.message }, StatusCodes.NOT_FOUND);
	}
};
