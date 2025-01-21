import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { profileRoutes } from './routes/profile/index.ts';
import { teamRoutes } from './routes/team/index.ts';

const app = new Hono();

app.get('/', (context) => context.text('Welome to volunteer management system!'));

// CORS middleware22
app.use(
	'/*',
	cors({
		origin: (origin) => {
			// Restrict access to specific domains
			const allowedOrigins = ['https://torontojs.com', 'https://api.torontojs.com'];
			return allowedOrigins.includes(origin || '') ? origin : null;
		},
		allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
		allowHeaders: ['Content-Type']
	})
);

app.route('/profiles', profileRoutes);
app.route('/teams', teamRoutes);

export default app;
