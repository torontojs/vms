import { SCHEMA_VERSION } from '../../constants/db.ts';
import type { Profile } from './validation.ts';

export async function getProfileById(database: D1Database, profileId: string) {
	const { results } = await database
		.prepare('SELECT * FROM profiles WHERE id = ?')
		.bind(profileId)
		.run<Profile>();

	return results[0];
}

export async function getAllProfiles(database: D1Database) {
	const { results } = await database.prepare('SELECT * FROM profiles').run<Profile>();

	return results;
}

export async function deleteProfileById(database: D1Database, profileId: string) {
	const { success } = await database
		.prepare('DELETE FROM profiles WHERE id = ?')
		.bind(profileId)
		.run();

	return success;
}

interface InsertProfileParams {
	payload: Pick<
		Profile,
		'description' | 'email' | 'happenedAt' | 'links' | 'name' | 'password'
	>;
	database: D1Database;
}

export async function insertProfile({
	payload: { email, name, password, description, links, happenedAt },
	database
}: InsertProfileParams) {
	const insertedAt = new Date().toISOString();
	const id = crypto.randomUUID();

	const { success } = await database
		.prepare(`
			INSERT INTO profile (id, email, password, name, description, links, happenedAt, insertedAt, schemaVersion)
			VALUES (?,?,?,?,?,?,?,?,?)
		`)
		.bind(
			id,
			email,
			name,
			password,
			description ?? null,
			links ?? null,
			happenedAt,
			insertedAt,
			SCHEMA_VERSION
		)
		.run();

	return { success, id };
}
