import { Hono } from 'hono';
import { cors } from 'hono/cors';
import profilesRoute from './routes/profiles/profiles';
import teamsRoutes from './routes/profiles/teams';

const app = new Hono();

app.get('/', (context) => context.text('Welome to volunteer management system!'));

// CORS middleware22
app.use(
	'/*',
	cors({
		// TODO: Allow all origins for now. Use specific domains in production.
		origin: '*',
		allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
		// TODO: Ensure the required headers are allowed.
		allowHeaders: ['Content-Type']
	})
);

// Existing routes
app.route('/profiles', profilesRoute);
app.route('/teams', teamsRoutes);

export default app;
