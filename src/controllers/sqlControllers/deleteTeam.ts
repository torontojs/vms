import { z } from 'zod';
import { StatusCodes } from 'src/constants/status-codes.ts';
import { Context } from 'hono';
import { SCHEMA_VERSION } from 'src/constants/db.ts';
import { BaseTeamData } from 'src/types/data/team'; // Import BaseTeamData

// Validator for team creation body
const TeamCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  happenedAt: z.string().min(1, 'HappenedAt is required'),
  description: z.string().optional(),
});

export type TeamCreateBody = z.infer<typeof TeamCreateSchema>;

// Service: Handles the database operation
async function createTeamInDb(database: any, id: string, body: TeamCreateBody) {
  const insertedAt = new Date().toISOString();
  const happenedAt = new Date(body.happenedAt).toISOString();

  return await database.prepare(
    'INSERT INTO team (id, name, schemaVersion, description, happenedAt, insertedAt) VALUES (?,?,?,?,?,?)'
  )
    .bind(id, body.name, SCHEMA_VERSION, body.description ?? '', happenedAt, insertedAt)
    .run();
}

// Handler: Processes the request and sends a response
export async function createTeamSql(context: Context<EnvironmentBindings>) {
  try {
    const body = await context.req.json();
    const parsedBody = TeamCreateSchema.parse(body); // Validate body with Zod

    const id = crypto.randomUUID();
    await createTeamInDb(context.env.database, id, parsedBody);

    return context.json({ message: 'Team created successfully' }, StatusCodes.CREATED);
  } catch (error) {
    return context.json({ error: error.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

// Validator for team ID (reuse if necessary)
const TeamIdSchema = z.string().uuid('Invalid team ID');

// Service: Handles the database operation for deletion
async function deleteTeamFromDb(database: any, teamId: string): Promise<boolean> {
  const results = await database
    .prepare('DELETE FROM team WHERE id = ?')
    .bind(teamId)
    .run();

  return results.meta.changes > 0; // Returns true if rows were deleted, false otherwise.
}

// Handler: Processes the request and sends a response
export async function deleteTeamById(context: Context<EnvironmentBindings>) {
  try {
    // Validate the `teamId` parameter
    const teamId = TeamIdSchema.parse(context.req.param('id'));

    const deleted = await deleteTeamFromDb(context.env.database, teamId);

    if (!deleted) {
      return context.json({ error: 'Team not found' }, StatusCodes.NOT_FOUND);
    }

    return context.json({ message: 'Team deleted successfully' }, StatusCodes.OKAY);
  } catch (error) {
    return context.json({ error: error.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
