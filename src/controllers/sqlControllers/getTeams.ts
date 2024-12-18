import type { Context } from 'hono';
import { StatusCodes } from '../../constants/status-codes.ts';

export const getAllTeamsSql = async (context: Context<EnvironmentBindings>) => {
	try {
	  const { results } = await context.env.database.prepare(
		"SELECT * FROM teams",
	  ).all();
		
	  return context.json(results);
	} catch (e) {
	  return context.json({ err: e.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
  };

export const getTeamByIdSql = async (context: Context<EnvironmentBindings>) => {
	const id = context.req.param('id');
	try {
		const { results } = await context.env.database.prepare(
		  "SELECT * FROM teams WHERE user_id = ?",
		)
		  .bind(id)
		  .run();
		return context.json(results);
	  } catch (e) {
		return context.json({ err: e.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	  }
};


