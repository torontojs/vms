-- Migration number: 0003 	 2025-01-30T00:58:33.450Z

DROP TABLE IF EXISTS team;

CREATE TABLE IF NOT EXISTS team (
	-- UUID stored as text
	id TEXT NOT NULL UNIQUE COLLATE BINARY,
	-- Schema version to use
	schemaVersion INTEGER NOT NULL DEFAULT 1,
	-- Name of the team
	name TEXT NOT NULL,
	-- Description of the team
	description TEXT,
	-- The date when this team was created
	happenedAt TEXT NOT NULL,
	-- The date when this team was added to the database
	insertedAt TEXT NOT NULL,
	-- The date this team was closed
	closedAt TEXT,

	PRIMARY KEY (id)
);
