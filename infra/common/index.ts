export const startCommon = async () => {
	await import("./secrets");
	await import("./config");
	await import("./dynamo");
	await import("./email");
	await import("./neon");
	await import("./dev");
	await import("./setup");
};
