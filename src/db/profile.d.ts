export interface Profile {
	id: string;
    email: string;
    schemaVersion: number;
    name: string;
    description?: string;
    happenedAt: Date;
    insertedAt: Date;
    links?: string;
}