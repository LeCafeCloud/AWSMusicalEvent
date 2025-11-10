import type { ReactElement } from "react";
import MagicLinkEmail from "../emails/magic-link";
import WelcomeEmail from "../emails/welcome";
import { renderEmailTemplate } from "./email-renderer";
import { sendEmail } from "./email-sender";
import type { EmailResult, MagicLinkConfig, WelcomeConfig } from "./types";

/**
 * Email Factory - Fluent API for sending emails
 */
export const EmailFactory = {
	/**
	 * Send a magic link email for passwordless authentication
	 */
	async sendMagicLink(config: MagicLinkConfig): Promise<EmailResult> {
		const html = await renderEmailTemplate(
			MagicLinkEmail({
				email: config.email,
				url: config.url,
				expiresIn: config.expiresIn || 5,
			}),
		);

		const text = `Sign in to AWS Musical Event\n\nClick this link to sign in: ${config.url}\n\nThis link will expire in ${config.expiresIn || 5} minutes.`;

		return sendEmail({
			to: config.email,
			subject: "🎵 Sign in to AWS Musical Event",
			html,
			text,
		});
	},

	/**
	 * Send a welcome email to new users
	 */
	async sendWelcome(config: WelcomeConfig): Promise<EmailResult> {
		const html = await renderEmailTemplate(
			WelcomeEmail({
				name: config.name,
				email: config.email,
				dashboardUrl: config.dashboardUrl,
			}),
		);

		const text = `Welcome to AWS Musical Event!\n\nHello ${config.name},\n\nWe're excited to have you on board. Transform your AWS events into real-time symphony.\n\nThe AWS Musical Event Team`;

		return sendEmail({
			to: config.email,
			subject: "🎉 Welcome to AWS Musical Event!",
			html,
			text,
		});
	},

	/**
	 * Send a custom email with a React template
	 */
	async sendCustom(
		to: string,
		subject: string,
		template: ReactElement,
		textFallback?: string,
	): Promise<EmailResult> {
		const html = await renderEmailTemplate(template);

		return sendEmail({
			to,
			subject,
			html,
			text: textFallback,
		});
	},
} as const;
