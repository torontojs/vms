-- Role Schema
CREATE TABLE IF NOT EXISTS role (
    id TEXT PRIMARY KEY,               -- UUID stored as TEXT
    schemaVersion INTEGER NOT NULL,
    role TEXT NOT NULL,
    description TEXT,
    teamId TEXT NOT NULL,              -- UUID stored as TEXT
    profileId TEXT NOT NULL,           -- UUID stored as TEXT
    happenedAt TEXT NOT NULL,
    insertedAt TEXT NOT NULL,
    FOREIGN KEY (teamId) REFERENCES team(id),
    FOREIGN KEY (profileId) REFERENCES profile(id)
);
