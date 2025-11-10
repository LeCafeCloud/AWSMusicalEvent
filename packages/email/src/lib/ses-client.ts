import { SESClient } from "@aws-sdk/client-ses";

/**
 * Shared SES client for all emails
 * Singleton pattern to reuse the same connection
 */
export const sesClient = new SESClient({});
