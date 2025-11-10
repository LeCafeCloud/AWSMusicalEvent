/**
 * Main entry point for sending emails
 * Re-exports all types and functions from modular files
 */

// Export the main factory
export { EmailFactory } from "./lib/email-factory";

// Export advanced utilities
export { renderEmailTemplate } from "./lib/email-renderer";
export { sendEmail } from "./lib/email-sender";
export { sesClient } from "./lib/ses-client";

// Export types
export type {
	BaseEmailConfig,
	EmailResult,
	MagicLinkConfig,
	WelcomeConfig,
} from "./lib/types";
