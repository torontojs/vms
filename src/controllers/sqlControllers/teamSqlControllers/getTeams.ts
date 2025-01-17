import { z } from 'zod';
import { StatusCodes } from 'src/constants/status-codes.ts';
import type { Context } from 'hono';

// Zod schema for validating the `id` parameter in getTeamByIdSql
const TeamIdSchema = z.string().uuid('Invalid team ID format');

// Zod schema for validating the structure of the data returned by the database
const TeamSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  schemaVersion: z.number(),
  description: z.string().optional(),
  happenedAt: z.string(),
  insertedAt: z.string(),
});

// SQL Query for getting all teams
async function getAllTeamsFromDb(database: D1Database) {
  const { results } = await database.prepare('SELECT * FROM team').run();
  return results;
}

// SQL Query for getting a team by ID
async function getTeamByIdFromDb(database: D1Database, id: string) {
  const { results } = await database
    .prepare('SELECT * FROM team WHERE id = ?')
    .bind(id)
    .run();
  return results[0];
}

// Handler: Validates the ID and fetches a team by ID
export const getTeamByIdSql = async (context: Context<EnvironmentBindings>) => {
  const id = context.req.param('id');
  try {
    // Validate the `id` parameter
    TeamIdSchema.parse(id);

    // Fetch team from DB
    const team = await getTeamByIdFromDb(context.env.database, id);

    if (!team) {
      return context.json({ error: 'Team not found' }, StatusCodes.NOT_FOUND);
    }

    // Validate the result with Zod
    const validatedTeam = TeamSchema.parse(team);

    return context.json(validatedTeam);
  } catch (err) {
    return context.json({ err: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Handler: Fetches all teams and validates the result
export const getAllTeamsSql = async (context: Context<EnvironmentBindings>) => {
  try {
    // Fetch all teams from DB
    const results = await getAllTeamsFromDb(context.env.database);

    // Validate the result with Zod
    const teams = z.array(TeamSchema).parse(results);

    return context.json(teams);
  } catch (err) {
    return context.json({ err: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
