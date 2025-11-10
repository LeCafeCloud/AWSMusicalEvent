import { Link, Section, Text } from "@react-email/components";
import { EmailButton } from "./components/EmailButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { EmailLayout } from "./components/EmailLayout";

interface MagicLinkEmailProps {
	email: string;
	url: string;
	expiresIn?: number; // in minutes
}

/**
 * Magic link authentication email
 * Allows users to sign in without a password
 */
export const MagicLinkEmail = ({ email, url, expiresIn = 5 }: MagicLinkEmailProps) => {
	const preview = `Sign in to AWS Musical Event`;

	return (
		<EmailLayout preview={preview}>
			<EmailHeader
				title="Sign in to your account"
				subtitle="Transform your AWS events into symphony"
			/>

			<Section className="px-8">
				<Text className="m-0 text-[16px] text-zinc-700 leading-[26px]">Hello,</Text>

				<Text className="m-0 mt-4 text-[16px] text-zinc-700 leading-[26px]">
					You requested to sign in to <strong>AWS Musical Event</strong> with the email address{" "}
					<strong>{email}</strong>.
				</Text>

				<Text className="m-0 mt-4 text-[16px] text-zinc-700 leading-[26px]">
					Click the button below to sign in instantly:
				</Text>

				<Section className="my-8 text-center">
					<EmailButton href={url} text="🎵 Sign In" />
				</Section>

				<Text className="m-0 mt-4 text-[14px] text-zinc-600 leading-6">
					Or copy and paste this link into your browser:
				</Text>
				<Text className="m-0 mt-2 text-[13px] text-zinc-500 leading-[22px] break-all">
					<Link href={url} className="text-zinc-700 underline">
						{url}
					</Link>
				</Text>

				<Section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
					<Text className="m-0 text-[13px] text-amber-900 leading-5">
						⚠️ <strong>Important:</strong> This sign-in link will expire in{" "}
						<strong>{expiresIn} minutes</strong> for security reasons.
					</Text>
				</Section>

				<Text className="m-0 mt-8 text-[14px] text-zinc-500 leading-[22px]">
					If you didn't request this sign-in, you can safely ignore this email.
				</Text>
			</Section>

			<EmailFooter />
		</EmailLayout>
	);
};

MagicLinkEmail.PreviewProps = {
	email: "john.doe@example.com",
	url: "https://awsymphony.com/auth/verify?token=abc123xyz",
	expiresIn: 5,
} as MagicLinkEmailProps;

export default MagicLinkEmail;
