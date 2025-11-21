import { Resource } from "sst";
import { SymphonyVisualizer } from "@/components/symphony/symphony-visualizer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function SymphonyPage() {
	// Server-side: Get Realtime config
	const realtimeEndpoint = Resource.Realtime.endpoint;
	const realtimeAuthorizer = Resource.Realtime.authorizer;
	const appName = Resource.App.name;
	const appStage = Resource.App.stage;

	return (
		<div className="mx-auto max-w-7xl space-y-6 py-8">
			{/* Header */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Badge variant="secondary">Symphony</Badge>
							<Badge variant="outline" className="font-mono">
								{Resource.Config.name}
							</Badge>
						</div>
						<h1 className="text-4xl font-bold tracking-tight">AWSymphony Live</h1>
						<p className="text-lg text-muted-foreground">
							Real-time AWS infrastructure events transformed into sound and visualization
						</p>
					</div>
				</div>
			</div>

			<Separator />

			{/* Main Visualizer */}
			<SymphonyVisualizer
				realtimeEndpoint={realtimeEndpoint}
				realtimeAuthorizer={realtimeAuthorizer}
				appName={appName}
				appStage={appStage}
			/>
		</div>
	);
}
