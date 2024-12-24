#! /bin/bash

wrangler d1 execute vms-local-db --local --command "DROP TABLE IF EXISTS event_log; DROP TABLE IF EXISTS profile; DROP TABLE IF EXISTS role; DROP TABLE IF EXISTS team;"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS profile (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, email TEXT NOT NULL UNIQUE, schemaVersion INTEGER NOT NULL, name TEXT NOT NULL, description TEXT, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL, links TEXT);"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS team (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, name TEXT NOT NULL, description TEXT, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL);"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS role (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, role TEXT NOT NULL, description TEXT, teamId TEXT NOT NULL UNIQUE COLLATE BINARY, profileId TEXT NOT NULL UNIQUE COLLATE BINARY, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL, FOREIGN KEY (teamId) REFERENCES team(id), FOREIGN KEY (profileId) REFERENCES profile(id) ON DELETE CASCADE);"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS event_log (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, subject TEXT NOT NULL UNIQUE COLLATE BINARY, subjectSource TEXT NOT NULL DEFAULT 'profile' CHECK("subjectSource" IN ('profile', 'team', 'role', 'special')), verb TEXT NOT NULL, object TEXT NOT NULL UNIQUE COLLATE BINARY,objectSource TEXT NOT NULL DEFAULT 'special' CHECK("objectSource" IN ('profile', 'team', 'role', 'special')), happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL);"

# Insert dummy data into profile table
wrangler d1 execute vms-local-db --local --command "INSERT INTO profile (id, email, schemaVersion, name, description, happenedAt, insertedAt, links) VALUES ('1', 'john.doe@example.com', 1, 'John Doe', 'A volunteer', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z', 'https://sociallink.com/johndoe');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO profile (id, email, schemaVersion, name, description, happenedAt, insertedAt, links) VALUES ('2', 'jane.smith@example.com', 1, 'Jane Smith', 'Another volunteer', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z', 'https://sociallink.com/janesmith');"

# Insert dummy data into team table
wrangler d1 execute vms-local-db --local --command "INSERT INTO team (id, schemaVersion, name, description, happenedAt, insertedAt) VALUES ('1', 1, 'Team Alpha', 'First volunteer team', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO team (id, schemaVersion, name, description, happenedAt, insertedAt) VALUES ('2', 1, 'Team Beta', 'Second volunteer team', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z');"

# Insert dummy data into role table
wrangler d1 execute vms-local-db --local --command "INSERT INTO role (id, schemaVersion, role, description, teamId, profileId, happenedAt, insertedAt) VALUES ('1', 1, 'Coordinator', 'Leads the team', '1', '1', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO role (id, schemaVersion, role, description, teamId, profileId, happenedAt, insertedAt) VALUES ('2', 1, 'Member', 'Team member', '2', '2', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z');"

# Insert dummy data into event_log table
wrangler d1 execute vms-local-db --local --command "INSERT INTO event_log (id, schemaVersion, subject, subjectSource, verb, object, objectSource, happenedAt, insertedAt) VALUES ('1', 1, 'John Doe', 'profile', 'created', 'profile', 'profile', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO event_log (id, schemaVersion, subject, subjectSource, verb, object, objectSource, happenedAt, insertedAt) VALUES ('2', 1, 'Team Alpha', 'team', 'created', 'team', 'team', '2024-12-17T00:00:00Z', '2024-12-17T00:00:00Z');"
