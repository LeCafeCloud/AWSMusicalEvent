import { Link, Section, Text } from "@react-email/components";
import { Resource } from "sst";
import { EmailButton } from "./components/EmailButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailLayout } from "./components/EmailLayout";

interface WelcomeEmailProps {
	name: string;
	email: string;
	dashboardUrl?: string;
}

/**
 * Welcome email for new users
 * Presents the main features of the application
 */
export const WelcomeEmail = ({
	name,
	email,
	dashboardUrl = `${Resource.Urls.awsymphonyUrl}/dashboard`,
}: WelcomeEmailProps) => {
	const preview = `Welcome to AWS Musical Event! 🎵`;

	return (
		<EmailLayout preview={preview}>
			<EmailHeader
				title={`Welcome, ${name ?? email}! 🎉`}
				subtitle="Your cloud infrastructure becomes music"
			/>

			<Section className="px-8">
				<Text className="m-0 text-[16px] text-zinc-700 leading-[26px]">
					Hello <strong>{name ?? email}</strong>,
				</Text>

				<Text className="m-0 mt-4 text-[16px] text-zinc-700 leading-[26px]">
					We're excited to welcome you to <strong>AWS Musical Event</strong>! You're now ready to
					transform your AWS events into a real-time symphony.
				</Text>

				<Section className="my-8">
					<Text className="m-0 mb-4 text-[18px] font-semibold text-zinc-900">
						🎼 What can you do?
					</Text>

					<div className="space-y-3">
						<div className="flex items-start">
							<Text className="m-0 text-[15px] text-zinc-700 leading-6">
								<strong>⚡ Lambda Invocations</strong> → Synthesizer notes (pluck synth)
							</Text>
						</div>

						<div className="flex items-start">
							<Text className="m-0 text-[15px] text-zinc-700 leading-6">
								<strong>📦 S3 Events</strong> → Piano sounds for each upload
							</Text>
						</div>

						<div className="flex items-start">
							<Text className="m-0 text-[15px] text-zinc-700 leading-6">
								<strong>💾 DynamoDB Streams</strong> → Rhythmic percussion
							</Text>
						</div>

						<div className="flex items-start">
							<Text className="m-0 text-[15px] text-zinc-700 leading-6">
								<strong>🚨 CloudWatch Alarms</strong> → Dissonant chords
							</Text>
						</div>

						<div className="flex items-start">
							<Text className="m-0 text-[15px] text-zinc-700 leading-6">
								<strong>❌ Errors</strong> → Warning minor chords
							</Text>
						</div>
					</div>
				</Section>

				<Section className="my-8 text-center">
					<EmailButton href={dashboardUrl} text="🎵 Go to Dashboard" />
				</Section>

				<Section className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
					<Text className="m-0 text-[14px] text-blue-900 leading-[22px]">
						💡 <strong>Tip:</strong> Check out our{" "}
						<Link
							href={Resource.Config.githubUrl}
							className="text-blue-700 underline font-semibold"
						>
							documentation on GitHub
						</Link>{" "}
						to configure your first musical events.
					</Text>
				</Section>

				<Text className="m-0 mt-8 text-[14px] text-zinc-600 leading-[22px]">
					Have questions? Feel free to check our documentation or contact us.
				</Text>

				<Text className="m-0 mt-6 text-[15px] text-zinc-700 leading-6">
					Happy music composing! 🎶
					<br />
					<span className="text-zinc-600">The AWS Musical Event Team</span>
				</Text>
			</Section>

			<EmailFooter />
		</EmailLayout>
	);
};

WelcomeEmail.PreviewProps = {
	name: "John Doe",
	email: "john.doe@example.com",
	dashboardUrl: "https://awsymphony.com/dashboard",
} as WelcomeEmailProps;

export default WelcomeEmail;
