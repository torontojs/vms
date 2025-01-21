#!/bin/bash

# Drop existing tables if they exist
wrangler d1 execute vms-local-db --local --command "DROP TABLE IF EXISTS event_log; DROP TABLE IF EXISTS profile; DROP TABLE IF EXISTS role; DROP TABLE IF EXISTS team;"

# Create tables
wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS profile (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, email TEXT NOT NULL UNIQUE, schemaVersion INTEGER NOT NULL, name TEXT NOT NULL, description TEXT, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL, links TEXT);"
wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS team (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, name TEXT NOT NULL, description TEXT, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL);"
wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS role (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, role TEXT NOT NULL, description TEXT, teamId TEXT NOT NULL UNIQUE COLLATE BINARY, profileId TEXT NOT NULL UNIQUE COLLATE BINARY, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL, FOREIGN KEY (teamId) REFERENCES team(id), FOREIGN KEY (profileId) REFERENCES profile(id) ON DELETE CASCADE);"
wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS event_log (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, subject TEXT NOT NULL UNIQUE COLLATE BINARY, subjectSource TEXT NOT NULL DEFAULT 'profile' CHECK(subjectSource IN ('profile', 'team', 'role', 'special')), verb TEXT NOT NULL, object TEXT NOT NULL UNIQUE COLLATE BINARY, objectSource TEXT NOT NULL DEFAULT 'special' CHECK(objectSource IN ('profile', 'team', 'role', 'special')), happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL);"

# Insert dummy data into profile table
wrangler d1 execute vms-local-db --local --command "INSERT INTO profile (id, email, schemaVersion, name, description, happenedAt, insertedAt, links) VALUES ('3227114d-43c4-42ed-8aea-f3860fe42222', 'profile1@example.com', 1, 'John Doe', 'A sample profile description', '2025-01-20T10:00:00Z', '2025-01-20T10:00:00Z', 'https://example.com');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO profile (id, email, schemaVersion, name, description, happenedAt, insertedAt, links) VALUES ('aa7e8915-8034-43d9-b910-a2e3ebdb947f', 'profile2@example.com', 1, 'Jane Smith', 'Another sample profile description', '2025-01-20T11:00:00Z', '2025-01-20T11:00:00Z', 'https://example.com');"

# Insert dummy data into team table
wrangler d1 execute vms-local-db --local --command "INSERT INTO team (id, schemaVersion, name, description, happenedAt, insertedAt) VALUES ('9a633d13-8095-48a8-9bf1-08ea40f5faa0', 1, 'Team A', 'This is team A', '2025-01-20T10:00:00Z', '2025-01-20T10:00:00Z');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO team (id, schemaVersion, name, description, happenedAt, insertedAt) VALUES ('fc596eaf-896d-4247-a880-92ec5019d4bd', 1, 'Team B', 'This is team B', '2025-01-20T11:00:00Z', '2025-01-20T11:00:00Z');"

# Insert dummy data into role table
wrangler d1 execute vms-local-db --local --command "INSERT INTO role (id, schemaVersion, role, description, teamId, profileId, happenedAt, insertedAt) VALUES ('role1', 1, 'Developer', 'A software developer role', '9a633d13-8095-48a8-9bf1-08ea40f5faa0', '3227114d-43c4-42ed-8aea-f3860fe42222', '2025-01-20T10:00:00Z', '2025-01-20T10:00:00Z');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO role (id, schemaVersion, role, description, teamId, profileId, happenedAt, insertedAt) VALUES ('role2', 1, 'Manager', 'A team manager role', 'fc596eaf-896d-4247-a880-92ec5019d4bd', 'aa7e8915-8034-43d9-b910-a2e3ebdb947f', '2025-01-20T11:00:00Z', '2025-01-20T11:00:00Z');"

# Insert dummy data into event_log table
wrangler d1 execute vms-local-db --local --command "INSERT INTO event_log (id, schemaVersion, subject, subjectSource, verb, object, objectSource, happenedAt, insertedAt) VALUES ('event1', 1, '3227114d-43c4-42ed-8aea-f3860fe42222', 'profile', 'created', '9a633d13-8095-48a8-9bf1-08ea40f5faa0', 'team', '2025-01-20T10:00:00Z', '2025-01-20T10:00:00Z');"
wrangler d1 execute vms-local-db --local --command "INSERT INTO event_log (id, schemaVersion, subject, subjectSource, verb, object, objectSource, happenedAt, insertedAt) VALUES ('event2', 1, 'aa7e8915-8034-43d9-b910-a2e3ebdb947f', 'profile', 'assigned', 'role1', 'role', '2025-01-20T11:00:00Z', '2025-01-20T11:00:00Z');"
