import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resource } from "sst";
import { secondaryStorage } from "@/config/auth/secondary-storage.config";
import * as schema from "@/db/schema";
import { getGravatarUrl } from "@/utils/gravatar";
import { db } from "./db";

export const auth = betterAuth({
	appName: "AWSymphony",
	secret: Resource.BetterAuthSecret.value,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	secondaryStorage,
	plugins: [nextCookies()],
	socialProviders: {
		github: {
			clientId: Resource.GitHubClientId.value,
			clientSecret: Resource.GitHubClientSecret.value,
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					// If no image is provided, use Gravatar based on email
					const image = user.image || (user.email ? getGravatarUrl(user.email) : undefined);
					return {
						data: {
							...user,
							image,
						},
					};
				},
			},
		},
	},
});
