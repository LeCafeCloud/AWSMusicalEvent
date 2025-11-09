import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Resource } from "sst";
import * as schema from "../db/schema";

const sql = neon(Resource.NeonDatabaseUrl.url);

// Client Drizzle with all schemas
export const db = drizzle({ client: sql, schema });

// Export the type for use elsewhere
export type Database = typeof db;
