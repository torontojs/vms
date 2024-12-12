-- Drop existing 'todos' table if it exists
DROP TABLE IF EXISTS event_log;
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS team;

-- Event Log Schema // skip for now
CREATE TABLE IF NOT EXISTS event_log (
    id TEXT PRIMARY KEY,               -- UUID stored as TEXT
    schemaVersion INTEGER NOT NULL,
    subject TEXT NOT NULL,             -- UUID stored as TEXT (could be user or entity performing the action)
    verb TEXT NOT NULL,                -- Action (e.g., 'CREATE', 'UPDATE', 'DELETE')
    object TEXT NOT NULL,              -- UUID stored as TEXT (the affected entity, e.g., profile, team)
    happenedAt TEXT NOT NULL,          -- The time the event occurred
    insertedAt TEXT NOT NULL,          -- When the event log was inserted
    profileId TEXT,                    -- Optional FK for profile-related event (NULL if not related to a profile)
    roleId TEXT,                       -- Optional FK for role-related event (NULL if not related to a role)
    teamId TEXT,                       -- Optional FK for team-related event (NULL if not related to a team)
    FOREIGN KEY (profileId) REFERENCES profile(id),
    FOREIGN KEY (roleId) REFERENCES role(id),
    FOREIGN KEY (teamId) REFERENCES team(id)
);

-- Volunteer Profile Schema
CREATE TABLE IF NOT EXISTS profile (
    id TEXT PRIMARY KEY,               -- UUID stored as TEXT
    email TEXT NOT NULL UNIQUE,
    schemaVersion INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    happenedAt TEXT NOT NULL,
    insertedAt TEXT NOT NULL
);

-- Team Schema
CREATE TABLE IF NOT EXISTS team (
    id TEXT PRIMARY KEY,               -- UUID stored as TEXT
    schemaVersion INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    happenedAt TEXT NOT NULL,
    insertedAt TEXT NOT NULL
);

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

