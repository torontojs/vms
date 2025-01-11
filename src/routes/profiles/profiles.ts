import { Hono } from 'hono';
import { createProfile } from '../../controllers/createProfile';
import { deleteProfileById } from '../../controllers/deleteProfile';
import {
	getAllProfiles,
	getProfileById
} from '../../controllers/getProfiles';

const profilesRoutes = new Hono();

profilesRoutes.get('/', getAllProfiles).post(createProfile);

profilesRoutes.get('/:id', getProfileById).delete(deleteProfileById);

export default profilesRoutes;
