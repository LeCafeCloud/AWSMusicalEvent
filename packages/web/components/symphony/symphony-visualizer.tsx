"use client";

import { Activity, AlertCircle, Database, HardDrive, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import { AudioControls } from "@/components/symphony/audio-controls";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAudioEngine } from "@/hooks/use-audio-engine";
import { useRealtimeEvents } from "@/hooks/use-realtime-events";

interface SymphonyVisualizerProps {
	tenantId?: string; // AWS Account ID
	realtimeEndpoint: string;
	realtimeAuthorizer: string;
	appName: string;
	appStage: string;
}

const EVENT_ICONS: Record<string, typeof Activity> = {
	s3: HardDrive,
	dynamodb: Database,
	lambda: Zap,
	apigateway: Activity,
	cloudwatch: AlertCircle,
};

const EVENT_COLORS: Record<string, string> = {
	s3: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
	dynamodb: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
	lambda: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
	apigateway: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
	cloudwatch: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
};

export function SymphonyVisualizer({
	tenantId,
	realtimeEndpoint,
	realtimeAuthorizer,
	appName,
	appStage,
}: SymphonyVisualizerProps) {
	const { events, isConnected, error } = useRealtimeEvents({
		tenantId,
		realtimeEndpoint,
		realtimeAuthorizer,
		appName,
		appStage,
	});

	const { isInitialized, isMuted, initialize, playEventSound, toggleMute } = useAudioEngine({
		enabled: false,
		volume: 0.7,
	});

	// Track the previous event count to detect new events
	const prevEventCountRef = useRef(0);

	// Play sound when new events arrive
	useEffect(() => {
		if (events.length > prevEventCountRef.current && events.length > 0) {
			// New event(s) arrived, play sound for the most recent one
			const latestEvent = events[0];
			playEventSound(latestEvent.eventType);
		}
		prevEventCountRef.current = events.length;
	}, [events, playEventSound]);

	const connectionStatus = error ? `Error: ${error}` : isConnected ? "Connected" : "Connecting...";

	const stats = {
		total: events.length,
		s3: events.filter((e) => e.eventType === "s3").length,
		lambda: events.filter((e) => e.eventType === "lambda").length,
		dynamodb: events.filter((e) => e.eventType === "dynamodb").length,
	};

	return (
		<div className="grid gap-6 lg:grid-cols-3">
			{/* Sidebar - Stats & Controls */}
			<div className="space-y-6 lg:col-span-1">
				{/* Connection Status */}
				<Card className="p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div
								className={`size-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
							/>
							<span className="text-sm font-medium">{connectionStatus}</span>
						</div>
						<Badge variant={isConnected ? "default" : "secondary"}>
							{isConnected ? "Live" : "Offline"}
						</Badge>
					</div>
				</Card>

				{/* Audio Controls */}
				<AudioControls
					isInitialized={isInitialized}
					isMuted={isMuted}
					onInitialize={initialize}
					onToggleMute={toggleMute}
				/>

				{/* Stats */}
				<Card className="p-4">
					<h3 className="mb-4 font-semibold">Event Statistics</h3>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Total Events</span>
							<Badge variant="secondary">{stats.total}</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">S3 Events</span>
							<Badge variant="secondary">{stats.s3}</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Lambda Invocations</span>
							<Badge variant="secondary">{stats.lambda}</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">DynamoDB Operations</span>
							<Badge variant="secondary">{stats.dynamodb}</Badge>
						</div>
					</div>
				</Card>

				{/* Info */}
				<Card className="p-4">
					<h3 className="mb-2 font-semibold">About</h3>
					<p className="text-sm text-muted-foreground">
						This symphony visualizes real-time AWS infrastructure events. Each event type produces a
						unique sound and visualization.
					</p>
				</Card>
			</div>

			{/* Main Area - Event Stream */}
			<div className="lg:col-span-2">
				<Card className="p-4">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="font-semibold">Event Stream</h3>
						<Badge variant="outline" className="font-mono text-xs">
							topic: {tenantId ? `tenant/${tenantId}/events` : "events"}
						</Badge>
					</div>

					<ScrollArea className="h-[600px] w-full rounded-md border p-4">
						{events.length === 0 ? (
							<div className="flex h-full flex-col items-center justify-center gap-4 text-center">
								<Activity className="size-12 text-muted-foreground" />
								<div>
									<h4 className="font-medium">Waiting for events...</h4>
									<p className="text-sm text-muted-foreground">
										{isConnected
											? "Perform actions in your AWS account to see them here in real-time."
											: "Connecting to event stream..."}
									</p>
								</div>
								{isConnected && (
									<p className="text-xs text-muted-foreground">
										Try uploading a file to S3 or invoking a Lambda function
									</p>
								)}
							</div>
						) : (
							<div className="space-y-2">
								{events.map((event, idx) => {
									const Icon = EVENT_ICONS[event.eventType] || Activity;
									const colorClass = EVENT_COLORS[event.eventType] || "";
									const eventKey = `${event.timestamp}-${event.eventType}-${idx}`;

									return (
										<div
											key={eventKey}
											className={`rounded-lg border p-4 transition-all hover:shadow-md ${colorClass}`}
										>
											<div className="flex items-start gap-3">
												<Icon className="mt-1 size-5 shrink-0" />
												<div className="min-w-0 flex-1">
													<div className="mb-1 flex items-center gap-2">
														<Badge variant="outline" className="font-mono text-xs">
															{event.eventType}
														</Badge>
														<span className="text-xs text-muted-foreground">
															{new Date(event.timestamp).toLocaleTimeString()}
														</span>
													</div>
													<p className="text-sm font-medium">{event.detailType}</p>
													<p className="text-xs text-muted-foreground">
														{event.region} • {event.account}
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</ScrollArea>
				</Card>
			</div>
		</div>
	);
}
