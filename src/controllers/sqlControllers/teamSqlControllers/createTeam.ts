import { z } from 'zod';
import type { Context } from 'hono';
import { SCHEMA_VERSION } from '../../../constants/db.ts';
import { StatusCodes } from '../../../constants/status-codes.ts';
import type { BaseTeamData } from '../../../types/data/team';

// Validator (Zod) for the core fields in BaseTeamData
const TeamCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  happenedAt: z.string().min(1, 'HappenedAt is required').refine((val) => !isNaN(Date.parse(val)), {
    message: 'HappenedAt must be a valid ISO 8601 date string',
  }),
  description: z.string().optional(),
});

export type TeamCreateBody = z.infer<typeof TeamCreateSchema>;

// SQL Handler
async function createTeamInDb(database: D1Database, id: string, body: BaseTeamData) {
  const insertedAt = new Date().toISOString();
  const happenedAt = new Date(body.happenedAt).toISOString();

  return database.prepare(
    'INSERT INTO team (id, name, schemaVersion, description, happenedAt, insertedAt) VALUES (?,?,?,?,?,?)'
  )
    .bind(id, body.name, SCHEMA_VERSION, body.description ?? '', happenedAt, insertedAt)
    .run();
}

// Request Handler
export async function createTeamSql(context: Context<EnvironmentBindings>) {
  try {
    const body = await context.req.json();
    const parsedBody = TeamCreateSchema.parse(body); 

    const id = crypto.randomUUID();
    await createTeamInDb(context.env.database, id, parsedBody); 

    return context.json({ message: 'Team created successfully' }, StatusCodes.CREATED);
  } catch (err) {
    return context.json({ err: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
