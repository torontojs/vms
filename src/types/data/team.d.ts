export interface Team {
	id: string;
	schemaVersion: number;
	name: string;
	description?: string;
	happenedAt: string;
	insertedAt: string;
}

export interface TeamCreateBody {
	name: string;
	happenedAt: string;
	description?: string;
}

export interface TeamUpdateBody {
	name?: string;
	happenedAt?: string;
	description?: string;
}