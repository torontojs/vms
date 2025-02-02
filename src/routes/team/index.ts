import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { z } from 'zod';
import {
	type DataResponse,
	generateDataResponeSchema,
	generatePaginatedResponseSchema,
	type PaginatedResponse,
	StatusCodes,
	type StatusResponse,
	statusResponseFormatter,
	StatusResponseSchema
} from '../../utils/responses.ts';
import { IdParamSchema } from '../../utils/validation.ts';
import { createNewTeam, deleteTeamById, getAllTeams, getTeamById, updateTeamById } from './data.ts';
import { NewTeamSchema, TeamSchema, UpdateTeamSchema } from './validation.ts';

export const teamRoutes = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

teamRoutes.openapi(
	createRoute({
		method: 'post',
		path: '/',
		operationId: 'createNewTeam',
		summary: 'Create new team',
		description: 'Add a new team to the VMS including basic information about this team.',
		tags: ['Team'],
		request: {
			body: { content: { 'application/json': { schema: NewTeamSchema } }, required: true }
		},
		responses: {
			[StatusCodes.CREATED]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		try {
			const body = context.req.valid('json');
			const isSaved = await createNewTeam(context.env.database, body);

			if (!isSaved) {
				return context.json({ message: 'Team not saved' } satisfies StatusResponse, StatusCodes.FORBIDDEN);
			}

			return context.json({ message: 'Team created successfully' } satisfies StatusResponse, StatusCodes.CREATED);
		} catch (err) {
			return context.json({ message: err?.message ?? 'An error has occurred' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'put',
		path: '/{id}',
		operationId: 'updateTeam',
		summary: 'Update existing team',
		description: "Update information for an existing team based on it's id.",
		tags: ['Team'],
		request: {
			body: { content: { 'application/json': { schema: UpdateTeamSchema } }, required: true },
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		try {
			const { id } = context.req.valid('param');
			const body = context.req.valid('json');
			const isUpdated = await updateTeamById(context.env.database, id, body);

			if (!isUpdated) {
				return context.json({ message: 'Team not updated' } satisfies StatusResponse, StatusCodes.FORBIDDEN);
			}

			return context.json({ message: 'Team updated successfully' } satisfies StatusResponse, StatusCodes.OKAY);
		} catch (err) {
			return context.json({ message: err?.message ?? 'An error has occurred' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/{id}',
		operationId: 'getTeam',
		summary: 'Get team by ID',
		description: "Retrieves a single team based on it's id.",
		tags: ['Team'],
		request: {
			body: { content: { 'application/json': { schema: TeamSchema } }, required: true },
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generateDataResponeSchema(TeamSchema) } }
			},
			[StatusCodes.NOT_FOUND]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		try {
			const { id } = context.req.valid('param');
			const team = await getTeamById(context.env.database, id);

			if (!team) {
				return context.json({ message: 'Team not found' } satisfies StatusResponse, StatusCodes.NOT_FOUND);
			}

			return context.json({ data: team, _links: { self: { href: context.req.url } } } satisfies DataResponse<typeof team>, StatusCodes.OKAY);
		} catch (err) {
			return context.json({ message: err?.message ?? 'An error has occurred' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'get',
		path: '/',
		operationId: 'getTeams',
		summary: 'Get teams',
		description: 'Retrieves a list of teams',
		tags: ['Team'],
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: generatePaginatedResponseSchema(z.array(TeamSchema)) } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		try {
			const teams = await getAllTeams(context.env.database);

			return context.json(
				// TODO: implement proper pagination
				{
					data: teams,
					start: 0,
					end: teams.length - 1,
					total: teams.length,
					size: teams.length,
					currentPage: 1,
					lastPage: 1,
					_links: {
						self: { href: context.req.url },
						first: { href: context.req.url },
						last: { href: context.req.url }
					}
				} satisfies PaginatedResponse<typeof teams>,
				StatusCodes.OKAY
			);
		} catch (err) {
			return context.json({ message: err?.message ?? 'An error has occurred' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
);

teamRoutes.openapi(
	createRoute({
		method: 'delete',
		path: '/{id}',
		operationId: 'deleteTeam',
		summary: 'Delete team by id',
		description: "Deletes a single team based on it's id",
		tags: ['Team'],
		request: {
			params: IdParamSchema
		},
		responses: {
			[StatusCodes.OKAY]: {
				description: 'Successful response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.FORBIDDEN]: {
				description: 'Error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			},
			[StatusCodes.INTERNAL_SERVER_ERROR]: {
				description: 'Server error response',
				content: { 'application/json': { schema: StatusResponseSchema } }
			}
		}
	}),
	async (context) => {
		try {
			const { id } = context.req.valid('param');
			const isDeleted = await deleteTeamById(context.env.database, id);

			if (!isDeleted) {
				return context.json({ message: 'Team not deleted' } satisfies StatusResponse, StatusCodes.FORBIDDEN);
			}

			return context.json({ message: 'Team deleted successfully' } satisfies StatusResponse, StatusCodes.OKAY);
		} catch (err) {
			return context.json({ message: err?.message ?? 'An error has occurred' } satisfies StatusResponse, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
);
