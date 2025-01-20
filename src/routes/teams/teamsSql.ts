import { Hono } from 'hono';
import { createTeamSql } from '../../controllers/sqlControllers/teamSqlControllers/createTeam';
import { deleteTeamById } from '../../controllers/sqlControllers/teamSqlControllers/deleteTeam';
import { getAllTeamsSql, getTeamByIdSql } from '../../controllers/sqlControllers/teamSqlControllers/getTeams';
import { updateTeamById } from '../../controllers/sqlControllers/teamSqlControllers/updateTeam';

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
