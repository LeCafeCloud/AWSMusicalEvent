import { realtime } from "./realtime";

export const bus = new sst.aws.Bus("Bus");
export const defaultBus = sst.aws.Bus.get(
	"DefaultBus",
	"arn:aws:events:eu-west-3:376129851637:event-bus/default",
);

const busToRealtime = new sst.aws.Function("BusToRealtime", {
	handler: "packages/lambdas/src/realtime/bus-to-realtime.handler",
	link: [realtime],
	architecture: "arm64",
	memory: "256 MB",
	timeout: "10 seconds",
});

bus.subscribe("PublishToRealtime", busToRealtime.arn, {
	pattern: {
		source: ["awsymphony.lambda", "*"],
	},
});

defaultBus.subscribe("PublishToRealtimeDefault", busToRealtime.arn, {
	pattern: {
		source: ["aws.lambda", "aws.s3", "*"],
	},
});
