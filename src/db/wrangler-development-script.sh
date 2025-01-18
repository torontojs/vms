#! /bin/bash

wrangler d1 execute vms-local-db --local --command "DROP TABLE IF EXISTS event_log; DROP TABLE IF EXISTS profile; DROP TABLE IF EXISTS role; DROP TABLE IF EXISTS team;"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS profile (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, email TEXT NOT NULL UNIQUE, schemaVersion INTEGER NOT NULL, name TEXT NOT NULL, description TEXT, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL, links TEXT);"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS team (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, name TEXT NOT NULL, description TEXT, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL);"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS role (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, role TEXT NOT NULL, description TEXT, teamId TEXT NOT NULL UNIQUE COLLATE BINARY, profileId TEXT NOT NULL UNIQUE COLLATE BINARY, happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL, FOREIGN KEY (teamId) REFERENCES team(id), FOREIGN KEY (profileId) REFERENCES profile(id) ON DELETE CASCADE);"

wrangler d1 execute vms-local-db --local --command "CREATE TABLE IF NOT EXISTS event_log (id TEXT PRIMARY KEY NOT NULL UNIQUE COLLATE BINARY, schemaVersion INTEGER NOT NULL, subject TEXT NOT NULL UNIQUE COLLATE BINARY, subjectSource TEXT NOT NULL DEFAULT 'profile' CHECK("subjectSource" IN ('profile', 'team', 'role', 'special')), verb TEXT NOT NULL, object TEXT NOT NULL UNIQUE COLLATE BINARY,objectSource TEXT NOT NULL DEFAULT 'special' CHECK("objectSource" IN ('profile', 'team', 'role', 'special')), happenedAt TEXT NOT NULL, insertedAt TEXT NOT NULL);"
