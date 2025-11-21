import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { Resource } from "sst";

const client = new EventBridgeClient();

export const handler = async () => {
	await client.send(
		new PutEventsCommand({
			Entries: [
				{
					EventBusName: Resource.Bus.arn,
					Source: `${Resource.App.name}.lambda`,
					DetailType: "LambdaSyncInvocation",
					Detail: JSON.stringify({
						status: "success",
						function: process.env.AWS_LAMBDA_FUNCTION_NAME,
					}),
				},
			],
		}),
	);

	return {
		statusCode: 200,
		body: `Debug event sent to EventBridge ${Resource.App.name}`,
	};
};
