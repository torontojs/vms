import { z } from 'zod';
import { StatusCodes } from 'src/constants/status-codes.ts';
import { Context } from 'hono';
import type { Profile } from 'src/types/data/profile';

// Zod schema for validating the `id` parameter
const ProfileIdSchema = z.string().uuid('Invalid profile ID format');

// Service: Handles database operations for fetching profiles
async function getProfileFromDb(database: any, userId: string): Promise<Profile | null> {
  const { results } = await database
    .prepare('SELECT * FROM profiles WHERE id = ?')
    .bind(userId)
    .run<Profile>();

  return results.length > 0 ? results[0] : null; // Return first result or null if not found
}

async function getAllProfilesFromDb(database: any): Promise<Profile[]> {
  const { results } = await database.prepare('SELECT * FROM profiles').all<Profile>();
  return results;
}

// Handler: Processes the request to fetch a single profile by ID
export const getProfileById = async (context: Context<EnvironmentBindings>) => {
  const userId = context.req.param('id');
  try {
    // Validate `id` parameter using Zod
    ProfileIdSchema.parse(userId);

    const profile = await getProfileFromDb(context.env.database, userId);

    if (!profile) {
      return context.json({ error: 'Profile not found' }, StatusCodes.NOT_FOUND);
    }

    return context.json(profile);
  } catch (err) {
    return context.json({ err: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

// Handler: Processes the request to fetch all profiles
export const getAllProfiles = async (context: Context<EnvironmentBindings>) => {
  try {
    const profiles = await getAllProfilesFromDb(context.env.database);
    return context.json(profiles);
  } catch (e) {
    return context.json({ err: e.message }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
