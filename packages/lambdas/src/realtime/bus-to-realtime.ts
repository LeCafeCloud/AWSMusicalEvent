// functions/publish-to-iot.ts

import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane";
import type { EventBridgeEvent } from "aws-lambda";
import { Resource } from "sst";

const iot = new IoTDataPlaneClient();

export const handler = async (
	event: EventBridgeEvent<string, Record<string, unknown>>,
): Promise<void> => {
	console.log("Received event:", JSON.stringify(event, null, 2));

	// Extraire le type d'événement depuis source (aws.s3 → s3)
	const eventType = event.source.replace("aws.", "");

	// Payload simple pour le client
	const payload = {
		eventType, // "s3", "lambda", "dynamodb", etc.
		source: event.source,
		detailType: event["detail-type"],
		timestamp: event.time,
		account: event.account,
		region: event.region,
		detail: event.detail, // Détails complets de l'événement
	};

	// Topic simplifié : un seul channel par tenant
	const prefix = `${Resource.App.name}/${Resource.App.stage}`;
	const topic = `${prefix}/events`;

	console.log(`📤 Publishing to topic: ${topic}`);
	console.log(`📦 Payload:`, payload);

	await iot.send(
		new PublishCommand({
			topic,
			payload: Buffer.from(JSON.stringify(payload)),
			qos: 0,
		}),
	);

	console.log(`✅ Published ${eventType} event to ${topic}`);
};
