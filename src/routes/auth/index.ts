import { type Context, Hono } from 'hono';

import { ZodError } from 'zod';
import { StatusCodes, type StatusResponse } from '../../utils/responses.ts';
import { authenticate } from './data.ts';
import { SignInSchema } from './validate.ts';
import { setCookie } from "hono/cookie";

export const authRoutes = new Hono();

// Type UserIdExpiryTimeStampType;

authRoutes.post('/sign-in', async (context: Context<EnvironmentBindings>) => {
	try {
		const body = await context.req.json();
		const parsedBody = SignInSchema.parse(body);

		const userId = await authenticate(context.env.database, parsedBody);

		if (!userId) {
			return context.json<StatusResponse>({ message: 'Authorized requests' }, StatusCodes.UNAUTHORIZED);
		}

		const sessionToken = crypto.randomUUID()
		const hoursAhead = 1;
		const futureTimestamp = String(Date.now() + hoursAhead * 60 * 60 * 1000);
		await context.env.kv.put(sessionToken, futureTimestamp)

		return context.json<StatusResponse>({ message: 'Authorized successfully', data: sessionToken }, StatusCodes.CREATED);
	} catch (err) {
		if (err instanceof ZodError) {
			return context.json<StatusResponse>({ message: err?.message ?? 'Invalid input' }, StatusCodes.BAD_REQUEST);
		}
		return context.json<StatusResponse>({ message: err?.message ?? 'An error has occurred' }, StatusCodes.INTERNAL_SERVER_ERROR);
	}
});
