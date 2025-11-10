"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

/**
 * Client-side logout button component
 * Uses Better Auth client to sign out the user
 *
 * How it works:
 * 1. authClient.signOut() invalidates the session server-side and removes the cookie
 * 2. router.push("/") redirects to home page
 * 3. router.refresh() forces Next.js to refetch server components with the new session state
 */
export function LogoutButton() {
	const router = useRouter();

	const handleSignOut = async () => {
		await authClient.signOut();
		router.push("/");
		router.refresh(); // Force Next.js to refetch server components
	};

	return (
		<DropdownMenuItem
			onClick={handleSignOut}
			className="cursor-pointer text-red-600 focus:text-red-600"
		>
			<LogOut className="mr-2 h-4 w-4" />
			<span>Log out</span>
		</DropdownMenuItem>
	);
}
