import type { Context } from 'hono';
import { StatusCodes } from 'src/constants/status-codes';
import { SCHEMA_VERSION } from 'src/db/constants';
import type { Profile } from 'src/types/data/profile';

type CreateProfileRequestBody = Omit<Profile, 'id' | 'schemaVersion'>;

export const createProfile = async (context: Context<EnvironmentBindings>) => {
	const body: CreateProfileRequestBody = await context.req.json();

	try {
		const id = crypto.randomUUID();

		validateCreateProfileRequestBody(body);

		const {
			email,
			name,
			description,
			links,
			happenedAt
		} = body;

		const insertedAt = new Date().toISOString();

		const result = await context.env.database
			.prepare('INSERT INTO profile (id, email, name, description, links, happenedAt, insertedAt, schemaVersion) VALUES (?,?,?,?,?,?,?,?)')
			.bind(id, email, name, description, links, happenedAt, insertedAt, SCHEMA_VERSION)
			.run();

		console.log(result);

		return context.json({});
	} catch (error) {
		return context.json({ err: error.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};

function validateCreateProfileRequestBody(body: CreateProfileRequestBody) {
	body.email;
}
