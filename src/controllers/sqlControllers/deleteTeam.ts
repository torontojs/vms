import type { Context } from 'hono';

import { StatusCodes } from 'src/constants/status-codes.ts';

export const deleteTeamById = async (
	context: Context<EnvironmentBindings>
) => {
	const teamId = context.req.param('id');

	try {
		const results = await context.env.database
			.prepare('DELETE FROM team WHERE id = ?')
			.bind(teamId)
			.run();

		if (results.meta.changes === 0) {
			return context.json({ err: 'Team not found' }, StatusCodes.NOT_FOUND);
		}

		return context.json({ message: 'Team deleted successfully' }, StatusCodes.OKAY);
	} catch (error) {
		return context.json({ err: error.message }, StatusCodes.NOT_FOUND);
	}
};
