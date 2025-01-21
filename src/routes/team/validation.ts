import { z } from 'zod';

export interface Team {
	id: string;
	schemaVersion: number;
	name: string;
	description?: string;
	happenedAt: string;
	insertedAt: string;
}

export const NewTeamSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	happenedAt: z.string().min(1, 'HappenedAt is required').refine((val) => !isNaN(Date.parse(val)), {
		message: 'HappenedAt must be a valid ISO 8601 date string'
	}),
	description: z.string().optional()
});

export type NewTeamData = z.infer<typeof NewTeamSchema>;

export const UpdateTeamSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	happenedAt: z.string().optional().refine((val) => {
		if (val) { return !isNaN(Date.parse(val)); }
		return true;
	}, {
		message: 'HappenedAt must be a valid ISO 8601 date string'
	})
});

export type UpdateTeamData = z.infer<typeof UpdateTeamSchema>;
