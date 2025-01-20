import { z } from 'zod';
import { StatusCodes } from '../../../constants/status-codes.ts';
import type { Context } from 'hono';
import type { UpdateTeamData } from '../../../types/data/team';

// Zod schema for validating the `id` parameter
const TeamIdSchema = z.string().uuid('Invalid team ID format');

const TeamUpdateBodySchema = z.object({
  name: z.string().optional(), 
  description: z.string().optional(), 
  happenedAt: z.string().optional().refine((val) => {
    if (val) {return !isNaN(Date.parse(val));}  
    return true;
  }, {
    message: 'HappenedAt must be a valid ISO 8601 date string',
  })
});


// Service: Handles the database operation
async function updateTeamInDb(database: D1Database, teamId: string, body: UpdateTeamData) {
  const updateFields: string[] = [];
  const updateValues: unknown[] = [];

  if (body.name) {
    updateFields.push('name = ?');
    updateValues.push(body.name);
  }
  if (body.description) {
    updateFields.push('description = ?');
    updateValues.push(body.description);
  }
  if (body.happenedAt) {
    updateFields.push('happenedAt = ?');
    updateValues.push(body.happenedAt);
  }

  if (updateFields.length === 0) {
    throw new Error('No fields provided to update');
  }

  updateValues.push(teamId);

  const results = await database
    .prepare(`UPDATE team SET ${updateFields.join(', ')} WHERE id = ?`)
    .bind(...updateValues)
    .run();

  return results.meta.changes > 0;
}

// Handler: Processes the request and sends a response
export const updateTeamById = async (context: Context<EnvironmentBindings>) => {
  try {
    // Validate `id` parameter using Zod
    const teamId = context.req.param('id');
    TeamIdSchema.parse(teamId);

    // Validate body content using Zod
    const body: UpdateTeamData = await context.req.json();
    const parsedBody = TeamUpdateBodySchema.parse(body);

    const updated = await updateTeamInDb(context.env.database, teamId, parsedBody);

    if (!updated) {
      return context.json({ error: 'Team not found' }, StatusCodes.NOT_FOUND);
    }

    return context.json({ message: 'Team updated successfully' }, StatusCodes.OKAY);
  } catch (err) {
    return context.json({ err: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
