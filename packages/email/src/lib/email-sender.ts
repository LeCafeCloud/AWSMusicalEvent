import { SendEmailCommand } from "@aws-sdk/client-ses";
import { Resource } from "sst";
import { sesClient } from "./ses-client";
import type { BaseEmailConfig, EmailResult } from "./types";

/**
 * Base function to send emails via AWS SES
 */
export async function sendEmail({
	to,
	subject,
	html,
	text,
}: BaseEmailConfig): Promise<EmailResult> {
	const from = `noreply@${Resource.Email.sender}`;

	const command = new SendEmailCommand({
		Source: from,
		Destination: {
			ToAddresses: [to],
		},
		Message: {
			Subject: {
				Data: subject,
				Charset: "UTF-8",
			},
			Body: {
				Html: {
					Data: html,
					Charset: "UTF-8",
				},
				...(text && {
					Text: {
						Data: text,
						Charset: "UTF-8",
					},
				}),
			},
		},
	});

	try {
		const response = await sesClient.send(command);
		console.log("Email sent successfully:", response.MessageId);
		return { success: true, messageId: response.MessageId };
	} catch (error) {
		console.error("Failed to send email:", error);
		return {
			success: false,
			error: error instanceof Error ? error : new Error("Unknown error"),
		};
	}
}
