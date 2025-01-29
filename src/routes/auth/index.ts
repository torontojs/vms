import { Hono } from 'hono';
import { createProfile } from '../../controllers/createProfile.ts';

export const authRoutes = new Hono();

authRoutes.post('/sign-up', createProfile);
