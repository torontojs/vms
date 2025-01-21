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
