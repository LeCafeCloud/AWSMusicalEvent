"use client";

import { Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AudioControlsProps {
	isInitialized: boolean;
	isMuted: boolean;
	onInitialize: () => void;
	onToggleMute: () => void;
}

export function AudioControls({
	isInitialized,
	isMuted,
	onInitialize,
	onToggleMute,
}: AudioControlsProps) {
	if (!isInitialized) {
		return (
			<Card className="p-4">
				<div className="space-y-3">
					<h3 className="font-semibold">Audio</h3>
					<p className="text-sm text-muted-foreground">
						Enable audio to hear sounds when events are received
					</p>
					<Button onClick={onInitialize} className="w-full" size="sm">
						Enable Audio
					</Button>
				</div>
			</Card>
		);
	}

	return (
		<Card className="p-4">
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold">Audio</h3>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" onClick={onToggleMute}>
							{isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
						</Button>
					</div>
				</div>
				<p className="text-sm text-muted-foreground">
					{isMuted ? "Audio is muted" : "Audio is enabled - sounds play on events"}
				</p>
			</div>
		</Card>
	);
}
