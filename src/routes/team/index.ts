import { Hono } from 'hono';

import { StatusCodes, type StatusResponse } from '../../utils/responses.ts';
import { idValidator, jsonValidator } from '../../utils/validation.ts';
import { createNewTeam, deleteTeamById, getAllTeams, getTeamById, updateTeamById } from './data.ts';
import { NewTeamSchema, UpdateTeamSchema } from './validation.ts';

export const teamRoutes = new Hono<EnvironmentBindings>();

teamRoutes.post('/', jsonValidator(NewTeamSchema), async (context) => {
	try {
		const body = context.req.valid('json');
		const isSaved = await createNewTeam(context.env.database, body);

		if (!isSaved) {
			return context.json<StatusResponse>({ message: 'Team not saved' }, StatusCodes.FORBIDDEN);
		}

		return context.json<StatusResponse>({ message: 'Team created successfully' }, StatusCodes.CREATED);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

teamRoutes.patch('/:id', idValidator, jsonValidator(UpdateTeamSchema), async (context) => {
	try {
		const id = context.req.valid('param');
		const body = context.req.valid('json');
		const isUpdated = await updateTeamById(context.env.database, id, body);

		if (!isUpdated) {
			return context.json<StatusResponse>({ message: 'Team not updated' }, StatusCodes.FORBIDDEN);
		}

		return context.json<StatusResponse>({ message: 'Team updated successfully' }, StatusCodes.OKAY);
	} catch (err) {
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});

teamRoutes.get('/:id', idValidator, async (context) => {
	try {
		const id = context.req.valid('param');
		const team = await getTeamById(context.env.database, id);

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

teamRoutes.delete('/:id', idValidator, async (context) => {
	try {
		const id = context.req.valid('param');
		const isDeleted = await deleteTeamById(context.env.database, id);

		if (!isDeleted) {
			return context.json<StatusResponse>({ message: 'Team not deleted' }, StatusCodes.FORBIDDEN);
		}

		return context.json({ message: 'Team deleted successfully' }, StatusCodes.OKAY);
	} catch (err) {
		return context.json({ error: err.message }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});
