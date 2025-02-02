import { z } from 'zod';
import { BaseDbEntitySchema } from '../../constants/db.ts';

export const NewTeamSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional()
});

export type NewTeamData = z.infer<typeof NewTeamSchema>;

export const UpdateTeamSchema = NewTeamSchema.partial();

export type UpdateTeamData = z.infer<typeof UpdateTeamSchema>;

export const TeamSchema = BaseDbEntitySchema.merge(UpdateTeamSchema).required();

export type Team = z.infer<typeof TeamSchema>;
