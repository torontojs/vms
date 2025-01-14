import type { Context } from 'hono';
import { StatusCodes } from '../../constants/status-codes.ts';
import type { Profile } from '../../types/data/profile';

export const getProfileById = async (context: Context<EnvironmentBindings>) => {
	const userId = context.req.param("id");
	try {
	  const { results } = await context.env.database.prepare(
		"SELECT * FROM profiles WHERE id = ?",
	  )
		.bind(userId)
		.run<Profile>();
	  return context.json(results);
	} catch (e) {
	  return context.json({ err: e.message }, StatusCodes.NOT_FOUND);
	}
  };

  export const getAllProfiles = async (context: Context) => {
	try {
	  let { results } = await context.env.database.prepare(
		"SELECT * FROM profiles",
	  )
		.all();
	  return context.json(results);
	} catch (e) {
	  return context.json({ err: e.message }, StatusCodes.NOT_FOUND);
	}
  };
