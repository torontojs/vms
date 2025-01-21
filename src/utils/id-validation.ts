import { z } from 'zod';

export const IdSchema = z.string().uuid('Invalid ID format');

export type Id = z.infer<typeof IdSchema>;
