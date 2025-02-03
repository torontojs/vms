import { type Context, Hono } from 'hono';

import { StatusCodes, type StatusResponse } from '../../utils/responses.ts';
import { authenticate } from './data.ts';
import { SignInSchema } from './validate.ts';
import { ZodError } from 'zod';

export const authRoutes = new Hono();

authRoutes.post('/sign-in', async (context: Context<EnvironmentBindings>) => {
	try {
		const body = await context.req.json();
		const parsedBody = SignInSchema.parse(body);

		const userId = await authenticate(context.env.database, parsedBody);

		if (!userId) {
			return context.json<StatusResponse>({ message: 'Authorized requests' }, StatusCodes.UNAUTHORIZED);
		}

		// Authentiated

		// Const sessionToken = crypto.randomUUID()
		// Const hoursAhead = 1;
		// Const futureTimestamp = Date.now() + hoursAhead * 60 * 60 * 1000;
		// // Await context.env.KV_STORE.put(sessionToken, userId + new Date())
		// 		Await context.env.KV_STORE.put()


		return context.json<StatusResponse>({ message: 'Authorized successfully' }, StatusCodes.CREATED);
	} catch (err) {
		if (err instanceof ZodError) {
			return context.json<StatusResponse>({ message: err?.message ?? 'Invalid input' }, StatusCodes.BAD_REQUEST);
		}
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});
