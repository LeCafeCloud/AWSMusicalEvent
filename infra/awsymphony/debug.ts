import { bus, defaultBus } from "./bus";

export const debugFunction = new sst.aws.Function("DebugFunction", {
	handler: "packages/lambdas/src/debug.handler",
	architecture: "arm64",
	memory: "256 MB",
	timeout: "10 seconds",
	url: true,
	link: [bus],
});
