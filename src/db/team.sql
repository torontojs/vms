-- Team Schema
CREATE TABLE IF NOT EXISTS team (
    id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY,               -- UUID stored as TEXT
    schemaVersion INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    happenedAt TEXT NOT NULL,
    insertedAt TEXT NOT NULL
);
