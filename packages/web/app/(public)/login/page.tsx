"use client";

import { useState } from "react";
import { GitHubSignInButton } from "@/components/github-sign-in-button";
import { MagicLinkSignInForm } from "@/components/magic-link-sign-in-form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className="flex min-h-[calc(100vh-16rem)] items-center justify-center py-12">
			<div className="w-full max-w-md space-y-8">
				<div className="space-y-2 text-center">
					<Badge variant="secondary" className="mb-2">
						Authentication
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
					<p className="text-muted-foreground">Sign in with magic link or GitHub</p>
				</div>

				<div className="rounded-lg border p-8 shadow-sm">
					<div className="space-y-6">
						<MagicLinkSignInForm disabled={isLoading} onLoadingChange={setIsLoading} />

						<div className="relative">
							<Separator />
							<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
								OR
							</span>
						</div>

						<div className="space-y-3">
							<GitHubSignInButton disabled={isLoading} onLoadingChange={setIsLoading} />
						</div>
					</div>
				</div>

				<p className="text-center text-sm text-muted-foreground">
					By signing in, you agree to our Terms of Service and Privacy Policy
				</p>
			</div>
		</div>
	);
}
