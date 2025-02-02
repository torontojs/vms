import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { profileRoutes } from './routes/profile/index.ts';
import { teamRoutes } from './routes/team/index.ts';
import { statusResponseFormatter } from './utils/responses.ts';

import packageJson from '../package.json';

const app = new OpenAPIHono<EnvironmentBindings>({
	defaultHook: statusResponseFormatter
});

// CORS middleware22
app.use(
	'/*',
	cors({
		// FIXME: We want to block origins external to Toronto JS
		origin: '*',
		allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
		allowHeaders: ['Content-Type']
	})
);

app.doc('/open-api.json', {
	openapi: '3.0.0',
	servers: [
		{
			url: 'https://vms.torontojs.com/',
			description: 'Production server.'
		},
		{
			url: 'http://localhost:8787/',
			description: 'Local server for development.'
		}
	],
	info: {
		title: 'Toronto JS Community Hub API',
		version: packageJson.version,
		description: `
		This is the API documentation for the [Toronto JS Community Hub](https://vms.torontojs.com/).

		Please note that the recomended way of getting data from the community hub is to use the staticly generated data available on GitHub.
		`
	}
});

app.route('/profiles', profileRoutes);
app.route('/teams', teamRoutes);

export default app;
