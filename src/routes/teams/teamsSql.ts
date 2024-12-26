import { Hono } from 'hono';
import { createTeamSql } from 'src/controllers/sqlControllers/createTeam';
import { deleteTeamById } from 'src/controllers/sqlControllers/deleteTeam';
import { getAllTeamsSql, getTeamByIdSql } from 'src/controllers/sqlControllers/getTeams';
import { updateTeamById } from 'src/controllers/sqlControllers/updateTeam';

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
