
import { Hono } from 'hono';
import { getAllTeamsSql, getTeamByIdSql } from '../../controllers/sqlControllers/getTeams';

const teamsSqlRoute = new Hono();

// Route to get all profiles
teamsSqlRoute.get('/', getAllTeamsSql);

// Route to get a profile by ID
teamsSqlRoute.get('/:id', getTeamByIdSql);

export default teamsSqlRoute;



