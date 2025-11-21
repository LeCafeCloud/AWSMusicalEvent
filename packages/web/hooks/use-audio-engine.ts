"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as Tone from "tone";

interface AudioEngineOptions {
	enabled?: boolean;
	volume?: number; // 0 to 1
}

// Map AWS event types to musical notes and synth configurations
const EVENT_SOUNDS: Record<
	string,
	{
		note: string;
		duration: string;
		synthType: "synth" | "membrane" | "metal" | "pluck";
	}
> = {
	s3: {
		note: "C4",
		duration: "8n",
		synthType: "pluck",
	},
	dynamodb: {
		note: "E4",
		duration: "8n",
		synthType: "synth",
	},
	lambda: {
		note: "G4",
		duration: "16n",
		synthType: "metal",
	},
	apigateway: {
		note: "A4",
		duration: "8n",
		synthType: "membrane",
	},
	cloudwatch: {
		note: "D4",
		duration: "8n",
		synthType: "synth",
	},
	default: {
		note: "F4",
		duration: "8n",
		synthType: "pluck",
	},
};

export function useAudioEngine({ enabled = false, volume = 0.7 }: AudioEngineOptions = {}) {
	const [isInitialized, setIsInitialized] = useState(false);
	const [isMuted, setIsMuted] = useState(!enabled);
	const synthsRef = useRef<Map<string, Tone.Synth | Tone.MembraneSynth | Tone.MetalSynth>>(
		new Map(),
	);
	const volumeNodeRef = useRef<Tone.Volume | null>(null);

	// Initialize audio engine
	useEffect(() => {
		if (!isInitialized) {
			return;
		}

		// Create volume node
		volumeNodeRef.current = new Tone.Volume(-10).toDestination();

		// Create different synths for different event types
		const pluckSynth = new Tone.Synth({
			oscillator: { type: "triangle" },
			envelope: {
				attack: 0.001,
				decay: 0.1,
				sustain: 0,
				release: 0.1,
			},
		}).connect(volumeNodeRef.current);

		const baseSynth = new Tone.Synth({
			oscillator: { type: "sine" },
			envelope: {
				attack: 0.02,
				decay: 0.2,
				sustain: 0.2,
				release: 0.4,
			},
		}).connect(volumeNodeRef.current);

		const membraneSynth = new Tone.MembraneSynth({
			pitchDecay: 0.05,
			octaves: 6,
			oscillator: { type: "sine" },
			envelope: {
				attack: 0.001,
				decay: 0.4,
				sustain: 0.01,
				release: 0.4,
			},
		}).connect(volumeNodeRef.current);

		const metalSynth = new Tone.MetalSynth({
			envelope: {
				attack: 0.001,
				decay: 0.1,
				release: 0.01,
			},
			harmonicity: 5.1,
			modulationIndex: 32,
			resonance: 4000,
			octaves: 1.5,
		}).connect(volumeNodeRef.current);

		synthsRef.current.set("synth", baseSynth);
		synthsRef.current.set("pluck", pluckSynth);
		synthsRef.current.set("membrane", membraneSynth);
		synthsRef.current.set("metal", metalSynth);

		// Cleanup
		return () => {
			synthsRef.current.forEach((synth) => {
				synth.dispose();
			});
			synthsRef.current.clear();
			volumeNodeRef.current?.dispose();
		};
	}, [isInitialized]);

	// Update volume
	useEffect(() => {
		if (volumeNodeRef.current) {
			// Convert 0-1 range to dB (-60 to 0)
			const dbVolume = volume === 0 ? -Infinity : Tone.gainToDb(volume);
			volumeNodeRef.current.volume.rampTo(dbVolume, 0.1);
		}
	}, [volume]);

	// Initialize Tone.js (requires user interaction)
	const initialize = useCallback(async () => {
		if (!isInitialized) {
			await Tone.start();
			console.log("🔊 Audio engine initialized");
			setIsInitialized(true);
			setIsMuted(false);
		}
	}, [isInitialized]);

	// Play sound for an event type
	const playEventSound = useCallback(
		(eventType: string) => {
			if (!isInitialized || isMuted) {
				return;
			}

			const soundConfig = EVENT_SOUNDS[eventType] || EVENT_SOUNDS.default;
			const synth = synthsRef.current.get(soundConfig.synthType);

			if (!synth) {
				console.warn(`Synth type ${soundConfig.synthType} not found`);
				return;
			}

			// Play the sound
			const now = Tone.now();
			synth.triggerAttackRelease(soundConfig.note, soundConfig.duration, now);

			console.log(`🎵 Playing ${eventType} sound: ${soundConfig.note}`);
		},
		[isInitialized, isMuted],
	);

	// Toggle mute
	const toggleMute = useCallback(() => {
		setIsMuted((prev) => !prev);
	}, []);

	return {
		isInitialized,
		isMuted,
		initialize,
		playEventSound,
		toggleMute,
	};
}
