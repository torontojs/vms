import { SCHEMA_VERSION } from 'src/db/constants';
import type { Profile } from 'src/types/data/profile';

interface InsertProfileParams {
	payload: Pick<
		Profile,
		'description' | 'email' | 'happenedAt' | 'links' | 'name'
	>;
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

interface UpdateProfilePayload {
	id: string;
	name?: string;
	description?: string;
	links?: string;
	happenedAt: string;
}
interface UpdateProfileParams {
	payload: UpdateProfilePayload;
	database: D1Database;
}

export async function updateProfile({
	payload: { id, name, description, links, happenedAt },
	database
}: UpdateProfileParams) {
	const data = { name, description, links, happenedAt };
	const entries = Object.entries(data).filter(
		([, value]) => value !== undefined
	);
	const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
	const values = [...entries.map(([, value]) => value), id];
	const query = `UPDATE profile SET ${setClause} WHERE id = ?`;

	return database
		.prepare(query)
		.bind(...values)
		.run();
}
