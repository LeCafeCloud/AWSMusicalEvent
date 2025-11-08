import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DeleteCommand,
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

interface SecondaryStorage {
	get: <T = unknown>(key: string) => Promise<T | null>;
	set: (key: string, value: unknown, ttl?: number) => Promise<void>;
	delete: (key: string) => Promise<void>;
}

const DYNAMODB_SORTKEY = "BETTER_AUTH";

// Singleton DynamoDB client with explicit region
const client = new DynamoDBClient({
	region: "eu-west-3",
});
const docClient = DynamoDBDocumentClient.from(client);

export const secondaryStorage: SecondaryStorage = {
	get: async (key) => {
		try {
			const result = await docClient.send(
				new GetCommand({
					TableName: Resource.DynamoST.name,
					Key: {
						pk: key,
						sk: DYNAMODB_SORTKEY,
					},
				}),
			);

			if (!result.Item?.value) {
				return null;
			}

			// Deserialize JSON value
			return typeof result.Item.value === "string"
				? JSON.parse(result.Item.value)
				: result.Item.value;
		} catch (error) {
			console.error("[SecondaryStorage] Get error:", error);
			return null;
		}
	},

	set: async (key, value, ttl) => {
		try {
			const item: Record<string, unknown> = {
				pk: key,
				sk: DYNAMODB_SORTKEY,
				value: JSON.stringify(value), // Serialize value to JSON
				createdAt: new Date().toISOString(),
			};

			// Add TTL if provided
			if (ttl) {
				item.ttl = Math.floor(Date.now() / 1000) + ttl;
			}

			await docClient.send(
				new PutCommand({
					TableName: Resource.DynamoST.name,
					Item: item,
				}),
			);
		} catch (error) {
			console.error("[SecondaryStorage] Set error:", error);
			throw new Error("Failed to set value in DynamoDB");
		}
	},

	delete: async (key) => {
		try {
			await docClient.send(
				new DeleteCommand({
					TableName: Resource.DynamoST.name,
					Key: {
						pk: key,
						sk: DYNAMODB_SORTKEY,
					},
				}),
			);
		} catch (error) {
			// Do not throw - delete can be best-effort
			console.error("[SecondaryStorage] Delete error:", error);
		}
	},
};
