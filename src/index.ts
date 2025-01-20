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
		origin: '*',
		allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
		allowHeaders: ['Content-Type']
	})
);

app.route('/profiles', profilesRoute);
app.route('/sql/teams', teamsSqlRoute);
app.route('/teams', teamsRoutes);

export default app;
