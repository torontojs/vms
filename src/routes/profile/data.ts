import { SCHEMA_VERSION } from '../../constants/db.ts';
import type { Profile } from './validation.ts';

export async function getProfileById(database: D1Database, profileId: string) {
	const { results } = await database
		.prepare('SELECT * FROM profile WHERE id = ?')
		.bind(profileId)
		.run<Profile>();

	return results[0];
}

export async function getAllProfiles(database: D1Database) {
	const { results } = await database.prepare('SELECT * FROM profile').run<Profile>();

	return results;
}

export async function deleteProfileById(database: D1Database, profileId: string) {
	const { success } = await database
		.prepare('DELETE FROM profile WHERE id = ?')
		.bind(profileId)
		.run();

	return success;
}

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

interface UpdateProfileParams {
	id: string;
	data: Partial<{
		name: string,
		description: string,
		links: string,
		happenedAt: string
	}>;
	database: D1Database;
}

export async function updateProfile({
	id,
	data,
	database
}: UpdateProfileParams) {
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
