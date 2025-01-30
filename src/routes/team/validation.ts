import { z } from 'zod';

export const NewTeamSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional()
});

export type NewTeamData = z.infer<typeof NewTeamSchema>;

export const UpdateTeamSchema = z
	.object({})
	.merge(NewTeamSchema)
	.partial()
	.refine(
		(obj) => Object.values(obj ?? {}).some((val) => val !== undefined),
		{ message: 'At least one property must be specified.' }
	);

export type UpdateTeamData = z.infer<typeof UpdateTeamSchema>;

export interface Team extends NewTeamData, DB.BaseEntry {}
