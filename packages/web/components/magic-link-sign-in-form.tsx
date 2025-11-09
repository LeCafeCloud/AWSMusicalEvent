"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface MagicLinkSignInFormProps {
	disabled?: boolean;
	onLoadingChange?: (loading: boolean) => void;
}

export function MagicLinkSignInForm({ disabled, onLoadingChange }: MagicLinkSignInFormProps) {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await authClient.signIn.magicLink(
			{
				email,
			},
			{
				onRequest: () => {
					onLoadingChange?.(true);
				},
				onSuccess: () => {
					onLoadingChange?.(false);
				},
				onError: (error) => {
					console.error("Magic link error:", error);
					onLoadingChange?.(false);
				},
			},
		);
	};

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-lg font-semibold">Magic Link</h2>
				<p className="text-sm text-muted-foreground">
					Enter your email and we&apos;ll send you a magic link to sign in
				</p>
			</div>
			<form className="space-y-3" onSubmit={handleSubmit}>
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Email address
					</label>
					<input
						id="email"
						type="email"
						placeholder="name@example.com"
						className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={disabled}
					/>
				</div>
				<Button type="submit" className="w-full" disabled={disabled}>
					{disabled ? "Sending..." : "Send Magic Link"}
				</Button>
			</form>
		</div>
	);
}
