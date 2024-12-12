-- Event Log Schema
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
