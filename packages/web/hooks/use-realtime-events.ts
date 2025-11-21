"use client";

import mqtt from "mqtt";
import { useCallback, useEffect, useState } from "react";

interface AWSEvent {
	eventType: string;
	source: string;
	detailType: string;
	timestamp: string;
	account: string;
	region: string;
	detail: Record<string, unknown>;
}

interface UseRealtimeEventsProps {
	tenantId?: string; // AWS Account ID
	realtimeEndpoint: string;
	realtimeAuthorizer: string;
	appName: string;
	appStage: string;
}

export function useRealtimeEvents({
	tenantId,
	realtimeEndpoint,
	realtimeAuthorizer,
	appName,
	appStage,
}: UseRealtimeEventsProps) {
	const [events, setEvents] = useState<AWSEvent[]>([]);
	const [isConnected, setIsConnected] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Create MQTT connection using WebSocket
		const connection = mqtt.connect(
			`wss://${realtimeEndpoint}/mqtt?x-amz-customauthorizer-name=${realtimeAuthorizer}`,
			{
				protocolVersion: 5,
				manualConnect: true,
				username: "",
				password: "public", // Token will be validated by authorizer
				clientId: `tenant_${tenantId}_${crypto.randomUUID()}`,
			},
		);

		connection.on("connect", async () => {
			try {
				console.log("✅ Connected to SST Realtime");
				setIsConnected(true);
				setError(null);

				// Subscribe to simplified topic: one channel per tenant
				const prefix = `${appName}/${appStage}`;
				const topic = tenantId ? `${prefix}/tenant/${tenantId}/events` : `${prefix}/events`;

				console.log(`🔌 Subscribing to topic: ${topic}`);
				console.log(`   Tenant ID: ${tenantId}`);
				console.log(`   All events will be received, filtering happens client-side`);

				await connection.subscribeAsync(topic, { qos: 1 });
				console.log(`✅ Subscribed to ${topic}`);
			} catch (err) {
				console.error("❌ Subscription error:", err);
				setError(err instanceof Error ? err.message : "Failed to subscribe");
			}
		});

		connection.on("message", (_topic, payload) => {
			try {
				const message = new TextDecoder("utf8").decode(new Uint8Array(payload));
				const event: AWSEvent = JSON.parse(message);
				console.log("📩 Received event:", event);

				setEvents((prev) => [event, ...prev].slice(0, 100)); // Keep last 100 events
			} catch (err) {
				console.error("Failed to parse event:", err);
			}
		});

		connection.on("error", (err) => {
			console.error("❌ Connection error:", err);
			setError(err.message || "Connection error");
			setIsConnected(false);
		});

		connection.on("disconnect", () => {
			console.log("🔌 Disconnected from SST Realtime");
			setIsConnected(false);
		});

		// Start connection
		connection.connect();

		// Cleanup
		return () => {
			console.log("🔌 Closing connection");
			connection.end();
		};
	}, [tenantId, realtimeEndpoint, realtimeAuthorizer, appName, appStage]);

	const clearEvents = useCallback(() => {
		setEvents([]);
	}, []);

	return {
		events,
		isConnected,
		error,
		clearEvents,
	};
}
