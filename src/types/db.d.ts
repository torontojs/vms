declare namespace DB {
	interface IdAndSchemaVersion {
		id: string;
		schemaVersion: number;
	}

	interface InsertionTimestamps {
		happenedAt: ISODate;
		insertedAt: ISODate;
	}

	type BaseEntry = IdAndSchemaVersion & InsertionTimestamps;
}
