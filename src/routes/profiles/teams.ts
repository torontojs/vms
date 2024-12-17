import { Hono } from 'hono';
import { getAllTeams, getTeamById } from '../../controllers/getTeams';

const teamsRoutes = new Hono();

// Route to get all teams
teamsRoutes.get('/', getAllTeams);

// Route to get a team by ID
teamsRoutes.get('/:id', getTeamById);

export default teamsRoutes;
