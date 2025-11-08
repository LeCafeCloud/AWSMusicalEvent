import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Resource } from "sst";
import * as schema from "../db/schema";

const sql = neon(Resource.NeonDatabaseUrl.url);

// Client Drizzle avec tous les schemas
export const db = drizzle({ client: sql, schema });

// Export du type pour usage ailleurs
export type Database = typeof db;
