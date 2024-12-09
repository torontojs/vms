import { Hono } from "hono";
import { getAllProfiles, getProfileById } from '../../controllers/getProfiles'

const profilesRoutes = new Hono();

// Route to get all profiles
profilesRoutes.get("/", getAllProfiles);

// Route to get a profile by ID
profilesRoutes.get("/:id", getProfileById);

export default profilesRoutes;
