import crypto from "node:crypto";

/**
 * Generate a Gravatar URL for the given email address.
 * @param email The user's email address.
 * @returns The Gravatar URL.
 */
export function getGravatarUrl(email: string): string {
	const hash = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex");
	return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
}
