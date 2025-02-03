import type { SignInData } from './validate.ts';

export async function authenticate(database: D1Database, body: SignInData) {
	const { results } = await database
		.prepare('SELECT id FROM profile WHERE email = ? AND password = ?')
		.bind(body.email, body.password)
		.run();

	return results?.[0];
}
