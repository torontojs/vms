export interface Profile {
	id: string;
	email: string;
	schemaVersion: number;
	password: string;
	name: string;
	description?: string;
	happenedAt: ISODate;
	insertedAt: ISODate;
	links?: string;
}
