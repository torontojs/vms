import type { Context } from 'hono';

import { StatusCodes } from 'src/constants/status-codes.ts';
import type { TeamUpdateBody } from 'src/types/data/team';

export const updateTeamById = async (context: Context<EnvironmentBindings>) => {
	try {
		const teamId = context.req.param('id');
		const body: TeamUpdateBody = await context.req.json();

		const updateFields = [];
		const updateValues = [];

		if (body.name) {
			updateFields.push('name = ?');
			updateValues.push(body.name);
		}
		if (body.description) {
			updateFields.push('description = ?');
			updateValues.push(body.description);
		}
		if (body.happenedAt) {
			updateFields.push('happenedAt = ?');
			updateValues.push(body.happenedAt);
		}

		if (updateFields.length === 0) {
			return context.json({ error: 'No fields provided to update' }, StatusCodes.INTERNAL_SERVER_ERROR);
		}

		updateValues.push(teamId);
		const results = await context.env.database.prepare(
			`UPDATE team SET ${updateFields.join(', ')} WHERE id = ?`
		)
			.bind(...updateValues)
			.run();

		if (results.meta.changes === 0) {
			return context.json({ err: 'Team not found' }, StatusCodes.NOT_FOUND);
		}

		return context.json({ message: 'Team updated successfully' }, StatusCodes.OKAY);
	} catch (err) {
		return context.json({ err: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};
