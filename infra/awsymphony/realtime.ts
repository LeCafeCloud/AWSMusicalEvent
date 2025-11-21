export const realtime = new sst.aws.Realtime("Realtime", {
	authorizer: "packages/lambdas/src/realtime/authorizer.handler",
});
