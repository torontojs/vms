import { StatusCodes } from 'src/constants/status-codes.ts';
import { Context } from 'hono';

// Service: Handles the database operation
async function deleteTeamFromDb(database: any, teamId: string): Promise<boolean> {
  const results = await database
    .prepare('DELETE FROM team WHERE id = ?')
    .bind(teamId)
    .run();

  return results.meta.changes > 0; // Returns true if rows were deleted, false otherwise.
}

// Handler: Processes the request and sends a response
export async function deleteTeamById(context: Context<EnvironmentBindings>) {
  const teamId = context.req.param('id');

  try {
    const deleted = await deleteTeamFromDb(context.env.database, teamId);

    if (!deleted) {
      return context.json({ error: 'Team not found' }, StatusCodes.NOT_FOUND);
    }

    return context.json({ message: 'Team deleted successfully' }, StatusCodes.OKAY);
  } catch (error) {
    return context.json({ error: error.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

