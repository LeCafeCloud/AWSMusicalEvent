// import { authNeon } from "../auth/neon";
// import { urlsLink } from "./dns";
// import { secrets } from "./secrets";

// new sst.x.DevCommand("GenerateAuthSchemas", {
// 	dev: {
// 		command: "bun better-auth:generate",
// 		directory: "services/auth",
// 		autostart: false,
// 	},
// 	link: [authNeon.neonLink, urlsLink, secrets.githubClientId, secrets.githubClientSecret, secrets.googleClientId, secrets.googleClientSecret],
// });

// new sst.x.DevCommand("GenerateDatabase", {
// 	dev: {
// 		command: "bun run db:generate",
// 		directory: "packages/db",
// 		autostart: false,
// 	},
// 	link: [authNeon.neonLink],
// });

// new sst.x.DevCommand("MigrateDatabase", {
// 	dev: {
// 		command: "bun run db:migrate",
// 		directory: "packages/db",
// 		autostart: false,
// 	},
// 	link: [authNeon.neonLink],
// });

// // Lambda pour exécuter les migrations au déploiement
// export const migrator = new sst.aws.Function("DatabaseMigration", {
// 	handler: "packages/db/src/migrate.handler",
// 	timeout: "5 minutes",
// 	link: [authNeon.neonLink],
// 	copyFiles: [
// 		{
// 			from: "packages/db/migrations",
// 			to: "migrations",
// 		},
// 	],
// });

// if (!$dev) {
//   new aws.lambda.Invocation("DatabaseMigratorInvocation", {
//     input: Date.now().toString(),
//     functionName: migrator.name,
//   });
// }
