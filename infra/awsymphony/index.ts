export const startAwSymphony = async () => {
	await import("./next");
	await import("./realtime");
	await import("./bus");
	await import("./debug");
	await import("./storage");
};
