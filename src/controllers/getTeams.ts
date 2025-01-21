import type { Context } from 'hono';
import { StatusCodes } from '../constants/status-codes';
import teams from '../data/teams.json';

export const getAllTeams = (context: Context) => context.json(teams, StatusCodes.OKAY);

export const getTeamById = (context: Context) => {
	const id = context.req.param('id');
	const team = teams.find((currentTeam) => currentTeam.id === id);

	if (!team) {
		return context.json({ error: 'Team not found' }, StatusCodes.NOT_FOUND);
	}

	return context.json(team, StatusCodes.OKAY);
};
