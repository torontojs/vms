import { Hono } from 'hono';
import { cors } from 'hono/cors';
import profilesRoute from './routes/profiles/profiles';
import teamsRoutes from './routes/teams/teams';
import teamsSqlRoute from './routes/teams/teamsSql';

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

app.route('/profiles', profilesRoute);

// TODO: should be changed to interact with real DB
app.route('/sql/teams', teamsSqlRoute);
app.route('/teams', teamsRoutes);

export default app;
