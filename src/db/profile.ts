import { SCHEMA_VERSION } from 'src/db/constants';
import type { Profile } from 'src/types/data/profile';

interface InsertProfileParams {
	payload: Pick<Profile, 'description' | 'email' | 'happenedAt' | 'links' | 'name'>;
	database: D1Database;
}

export async function insertProfile({
	payload: { email, name, description, links, happenedAt },
	database
}: InsertProfileParams) {
	const insertedAt = new Date().toISOString();
	const id = crypto.randomUUID();

	return database
		.prepare(
			`
      INSERT INTO profile (id, email, name, description, links, happenedAt, insertedAt, schemaVersion)
      VALUES (?,?,?,?,?,?,?,?)
      `
		)
		.bind(
			id,
			email,
			name,
			description ?? null,
			links ?? null,
			happenedAt,
			insertedAt,
			SCHEMA_VERSION
		)
		.run();
}
