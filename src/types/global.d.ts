interface Env {
	DB_DEV: D1Database;
	KV_STORE: KVNamespace;
}

interface EnvironmentBindings {
	Bindings: {
		database: D1Database,
		kv: KVNamespace
	};
}

type ISODate = string;
