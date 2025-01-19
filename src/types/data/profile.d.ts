export interface Profile {
	id: string;
	email: string;
	schemaVersion: number;
	name: string;
	description?: string;
	happenedAt: string;
	insertedAt: string;
	links?: string;
}
