/**
 * Shared types for the email package
 */

/**
 * Email sending result
 */
export interface EmailResult {
	success: boolean;
	messageId?: string;
	error?: Error;
}

/**
 * Base configuration for an email
 */
export interface BaseEmailConfig {
	to: string;
	subject: string;
	html: string;
	text?: string;
}

/**
 * Configuration for magic link email
 */
export interface MagicLinkConfig {
	email: string;
	url: string;
	expiresIn?: number;
}

/**
 * Configuration for welcome email
 */
export interface WelcomeConfig {
	email: string;
	name: string;
	dashboardUrl?: string;
}
