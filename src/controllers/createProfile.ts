import type { Context } from 'hono';
import { StatusCodes } from 'src/constants/status-codes';
import { SCHEMA_VERSION } from 'src/db/constants';
import type { Profile } from 'src/types/data/profile';

type CreateProfileRequestBody = Omit<Profile, 'id' | 'schemaVersion'>;

export async function createProfile(context: Context<EnvironmentBindings>) {
	const body: CreateProfileRequestBody = await context.req.json();

	try {
		// TODO : email, name length, links http format, happpendAt iso format
		// validateCreateProfileRequestBody(body);

		const id = crypto.randomUUID();
		const {
			email,
			name,
			description,
			links,
			happenedAt
		} = body;
		const insertedAt = new Date().toISOString();

		const { success, meta } = await context.env.database
			.prepare(`
				INSERT INTO profile (id, email, name, description, links, happenedAt, insertedAt, schemaVersion)
				VALUES (?,?,?,?,?,?,?,?)`)
			.bind(id, email, name, description, links, happenedAt, insertedAt, SCHEMA_VERSION)
			.run();

		if (!success) {
			throw Error(`INSERT query error`);
		}

		return context.json({ createdId: meta.last_row_id });
	} catch (error) {
		return context.json({ err: error.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
}
