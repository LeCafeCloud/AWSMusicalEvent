import { Resource } from "sst";
import { realtime } from "sst/aws/realtime";

export const handler = realtime.authorizer(async (token) => {
	// TODO: Validate the token (JWT from Better Auth or public access)
	// For now, allow public access to view symphonies

	console.log("🔐 Authorizer called with token:", token);

	const prefix = `${Resource.App.name}/${Resource.App.stage}`;

	const response = {
		subscribe: [
			// Allow subscribing to tenant events
			// Simplified: one channel per tenant, filtering happens client-side
			`${prefix}/events`,
			`${prefix}/tenant/*/events`,
		],
		publish: [
			// Users can't publish to event topics (read-only)
			`${prefix}/chat/room1`,
		],
	};

	console.log("✅ Authorizer response:", JSON.stringify(response, null, 2));

	// Return the topics to subscribe and publish
	return response;
});
