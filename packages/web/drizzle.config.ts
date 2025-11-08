import { defineConfig } from "drizzle-kit";
import { Resource } from "sst";

export default defineConfig({
	schema: ["./db/schemas/*"],
	out: "./db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: Resource.NeonDatabaseUrl.url,
	},
	verbose: true,
	strict: true,
});
