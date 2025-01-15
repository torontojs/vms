import { z } from 'zod';
import type { Context } from 'hono';
import { StatusCodes } from '../../constants/status-codes.ts';

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

// Reusable function to handle database queries
async function executeQuery(database: any, query: string, params: any[] = []) {
  try {
    const { results } = await database.prepare(query).bind(...params).run();
    return results;
  } catch (e) {
    throw new Error(e.message);
  }
}

// Handler for getting all teams with Zod validation on the response
export const getAllTeamsSql = async (context: Context<EnvironmentBindings>) => {
  try {
    const results = await executeQuery(context.env.database, 'SELECT * FROM team');

    // Validate the response with Zod
    const teams = z.array(TeamSchema).parse(results);

    return context.json(teams);
  } catch (e) {
    return context.json({ err: e.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Handler for getting a team by ID with Zod validation on input and response
export const getTeamByIdSql = async (context: Context<EnvironmentBindings>) => {
  const id = context.req.param('id');
  try {
    // Validate the `id` using Zod
    TeamIdSchema.parse(id);

    const results = await executeQuery(context.env.database, 'SELECT * FROM team WHERE id = ?', [id]);

    // Validate the response with Zod
    const team = TeamSchema.parse(results[0]); // Assuming single result

    return context.json(team);
  } catch (e) {
    return context.json({ err: e.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
