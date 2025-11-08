import { next } from "../awsymphony/next";
import { neonDatabase } from "../common/neon";
import { allOAuthSecrets, secrets } from "./secrets";

new sst.x.DevCommand("GenerateAuthSchemas", {
	dev: {
		command: "bun better-auth:generate",
		directory: "packages/web",
		autostart: false,
	},
	link: [neonDatabase.neonLink, secrets.betterAuthSecret, next, ...allOAuthSecrets],
});

new sst.x.DevCommand("GenerateDatabase", {
	dev: {
		command: "bun run db:generate",
		directory: "packages/web",
		autostart: false,
	},
	link: [neonDatabase.neonLink],
});

new sst.x.DevCommand("MigrateDatabase", {
	dev: {
		command: "bun run db:migrate",
		directory: "packages/web",
		autostart: false,
	},
	link: [neonDatabase.neonLink],
});

if (!$dev) {
	// Lambda to run migrations
	const migrator = new sst.aws.Function("DatabaseMigration", {
		handler: "packages/functions/src/db/migrate.handler",
		timeout: "5 minutes",
		link: [neonDatabase.neonLink],
		copyFiles: [
			{
				from: "packages/web/db/migrations",
				to: "migrations",
			},
		],
	});

	new aws.lambda.Invocation("DatabaseMigratorInvocation", {
		input: Date.now().toString(),
		functionName: migrator.name,
	});
}
