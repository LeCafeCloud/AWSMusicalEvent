import { Hr, Link, Section, Text } from "@react-email/components";
import { Resource } from "sst";

/**
 * Reusable footer for emails
 * Contains legal information and useful links
 */
export const EmailFooter = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Section className="px-8 pb-8">
			<Hr className="my-6 border-zinc-200" />

			<Text className="m-0 text-[12px] text-zinc-500 leading-5">
				This email was sent by{" "}
				<Link href={Resource.Config.githubUrl} className="text-zinc-700 underline">
					AWS Musical Event
				</Link>
				, an experience that transforms AWS events into real-time music.
			</Text>

			<Text className="m-0 mt-3 text-[11px] text-zinc-400 leading-[18px]">
				© {currentYear} AWS Musical Event. All rights reserved.
				<br />
				Powered by AWS EventBridge, Lambda and React Email.
			</Text>

			<Text className="m-0 mt-3 text-[11px] text-zinc-400 leading-[18px]">
				🎼 Transform your cloud infrastructure into a symphony
			</Text>
		</Section>
	);
};

export default EmailFooter;
