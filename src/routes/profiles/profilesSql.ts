
import { Hono } from 'hono';
import { getAllProfiles, getProfileById } from '../../controllers/sqlControllers/getProfiles';


const profilesSqlRoutes = new Hono();

// Route to get all profiles
profilesSqlRoutes.get('/', getAllProfiles);

// Route to get a profile by ID
profilesSqlRoutes.get('/:id', getProfileById);

export default profilesSqlRoutes;


