import { Hono } from 'hono';

import { IdSchema } from '../../utils/id-validation.ts';
import { StatusCodes, type StatusResponse } from '../../utils/responses.ts';
import { createNewTeam, deleteTeamById, getAllTeams, getTeamById, updateTeamById } from './data.ts';
import { NewTeamSchema, type UpdateTeamData, UpdateTeamSchema } from './validation.ts';

export const teamRoutes = new Hono<EnvironmentBindings>();

teamRoutes.post('/', async (context) => {
	try {
		const body = await context.req.json();
		const parsedBody = NewTeamSchema.parse(body);

		const isSaved = await createNewTeam(context.env.database, parsedBody);

		if (!isSaved) {
			return context.json<StatusResponse>({ message: 'Team not saved' }, StatusCodes.FORBIDDEN);
		}

		return context.json<StatusResponse>({ message: 'Team created successfully' }, StatusCodes.CREATED);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

teamRoutes.patch('/:id', async (context) => {
	try {
		const { success: isValidTeamId, data: teamId } = IdSchema.safeParse(context.req.param('id'));

		if (!isValidTeamId) {
			return context.json<StatusResponse>({ message: 'Invalid Team ID' }, StatusCodes.BAD_REQUEST);
		}

		const body: UpdateTeamData = await context.req.json();
		const { success: isValidData, data: parsedBody, error } = UpdateTeamSchema.safeParse(body);

		if (!isValidData) {
			return context.json<StatusResponse>({ message: JSON.stringify(error) }, StatusCodes.BAD_REQUEST);
		}

		const isUpdated = await updateTeamById(context.env.database, teamId, parsedBody);

		if (!isUpdated) {
			return context.json<StatusResponse>({ message: 'Team not updated' }, StatusCodes.FORBIDDEN);
		}

		return context.json<StatusResponse>({ message: 'Team updated successfully' }, StatusCodes.OKAY);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

teamRoutes.get('/:id', async (context) => {
	try {
		const { success: isValidTeamId, data: teamId } = IdSchema.safeParse(context.req.param('id'));

		if (!isValidTeamId) {
			return context.json<StatusResponse>({ message: 'Invalid Team ID' }, StatusCodes.BAD_REQUEST);
		}

		const team = await getTeamById(context.env.database, teamId);

		if (!team) {
			return context.json<StatusResponse>({ message: 'Team not found' }, StatusCodes.NOT_FOUND);
		}

		return context.json(team);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

teamRoutes.get('/', async (context) => {
	try {
		const teams = await getAllTeams(context.env.database);

		return context.json(teams);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

teamRoutes.delete('/:id', async (context) => {
	try {
		const { success: isValidTeamId, data: teamId } = IdSchema.safeParse(context.req.param('id'));

		if (!isValidTeamId) {
			return context.json<StatusResponse>({ message: 'Invalid Team ID' }, StatusCodes.BAD_REQUEST);
		}

		const isDeleted = await deleteTeamById(context.env.database, teamId);

		if (!isDeleted) {
			return context.json<StatusResponse>({ message: 'Team not deleted' }, StatusCodes.FORBIDDEN);
		}

		return context.json({ message: 'Team deleted successfully' }, StatusCodes.OKAY);
	} catch (err) {
		return context.json({ error: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});
