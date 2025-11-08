export const secrets = {
	// BetterAuth Secret
	betterAuthSecret: new sst.Secret("BetterAuthSecret"),

	// Neon Secrets
	neonProjectId: new sst.Secret("NeonProjectId"),
	neonPassword: new sst.Secret("NeonPassword"),

	// OAuth Secrets
	githubClientId: new sst.Secret("GitHubClientId"),
	githubClientSecret: new sst.Secret("GitHubClientSecret"),
};

export const allOAuthSecrets = [
	secrets.githubClientId,
	secrets.githubClientSecret,
];
