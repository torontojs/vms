import { Hono } from 'hono';
import { createTeamSql } from '../../controllers/sqlControllers/createTeam';
import { deleteTeamById } from '../../controllers/sqlControllers/deleteTeam';
import { getAllTeamsSql, getTeamByIdSql } from '../../controllers/sqlControllers/getTeams';
import { updateTeamById } from '../../controllers/sqlControllers/updateTeam';

const teamsSqlRoute = new Hono();

// Route to get all profiles
teamsSqlRoute.get('/', getAllTeamsSql);

// Route to get a profile by ID
teamsSqlRoute.get('/:id', getTeamByIdSql);

// Route to create a new profile
teamsSqlRoute.post('/', createTeamSql);

// Route to delete a profile by ID
teamsSqlRoute.delete('/:id', deleteTeamById);

// Route to update by ID
teamsSqlRoute.patch('/:id', updateTeamById);

export default teamsSqlRoute;
