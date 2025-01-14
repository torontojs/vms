import type { Context } from 'hono';
import { StatusCodes } from 'src/constants/status-codes.ts';

export async function deleteTeamById(
	context: Context<EnvironmentBindings>
) {
	const teamId = context.req.param('id');

	try {
		const results = await context.env.database
			.prepare('DELETE FROM team WHERE id = ?')
			.bind(teamId)
			.run();

		if (results.meta.changes === 0) {
			throw new Error(`Team not found, Error ${StatusCodes.NOT_FOUND}`);
		}

		return context.json({ message: 'Team deleted successfully' }, StatusCodes.OKAY);
	} catch (error) {
		return context.json({ err: error.message }, StatusCodes.NOT_FOUND);
	}
};
