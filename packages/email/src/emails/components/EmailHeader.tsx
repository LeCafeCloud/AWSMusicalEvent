import { Heading, Hr, Section, Text } from "@react-email/components";
import { Resource } from "sst";

interface EmailHeaderProps {
	title: string;
	subtitle?: string;
}

/**
 * Reusable header for emails
 * Displays the title and optionally a subtitle
 */
export const EmailHeader = ({ title, subtitle }: EmailHeaderProps) => {
	return (
		<>
			<Section className="bg-zinc-900 px-8 py-8 rounded-t-lg">
				<Heading className="m-0 text-center font-bold text-[28px] text-white">
					🎵 {Resource.Config.name}
				</Heading>
				{subtitle && (
					<Text className="m-0 mt-2 text-center text-[14px] text-zinc-300">{subtitle}</Text>
				)}
			</Section>

			<Section className="px-8 pt-8">
				<Heading className="m-0 text-[24px] font-semibold text-zinc-900">{title}</Heading>
				<Hr className="my-4 border-zinc-200" />
			</Section>
		</>
	);
};

export default EmailHeader;
