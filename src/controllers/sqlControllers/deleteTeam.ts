import { z } from 'zod';
import { StatusCodes } from './../constants/status-codes.ts';
import { Context } from 'hono';

// Validator for team ID
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
