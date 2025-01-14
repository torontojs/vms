import type { Context } from 'hono';

import { SCHEMA_VERSION } from 'src/constants/db.ts';
import { StatusCodes } from 'src/constants/status-codes.ts';
import type { TeamCreateBody } from 'src/types/data/team';

export function async createTeamSql(context: Context<EnvironmentBindings>) {
	try {
		const body: TeamCreateBody = await context.req.json();

		if (!body.name) {
			throw Error('name is required to create a team');
		}

		if (!body.happenedAt) {
			throw Error('happenedAt is required to create a team');
		}

		const id = crypto.randomUUID(); 
		const insertedAt = new Date().toISOString();
		const happenedAt = new Date(body.happenedAt).toISOString();

		const createTeam = await context.env.database.prepare(
			'INSERT INTO team (id, name, schemaVersion, description, happenedAt, insertedAt) VALUES (?,?,?,?,?,?)'
		)
			.bind(id, body.name, SCHEMA_VERSION, body.description ?? '', happenedAt, insertedAt)
			.run();
		const createdTeam = await context.env.database.prepare(
			'SELECT * FROM team WHERE id = ?'
		)
			.bind(id)
			.first();

		return context.json(createdTeam);
	} catch (err) {
		return context.json({ err: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};
