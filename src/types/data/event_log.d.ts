export type LogItemSource = 'profile' | 'team' | 'role' | 'special';

export interface EventLog {
	id: string;
    schemaVersion: number;
    subject: string;
    subjectSource: LogItemSource;
    verb: string;
    object: string;
    objectSource: LogItemSource;
    happenedAt: Date;
    insertedAt: Date;
}