import { Button } from "@react-email/components";

interface EmailButtonProps {
	href: string;
	text: string;
	variant?: "primary" | "secondary";
}

/**
 * Reusable button for emails
 * Follows shadcn/ui styling
 */
export const EmailButton = ({ href, text, variant = "primary" }: EmailButtonProps) => {
	const primaryClasses =
		"inline-block rounded-md bg-zinc-900 px-6 py-3 text-center font-semibold text-[14px] text-white no-underline";
	const secondaryClasses =
		"inline-block rounded-md border border-zinc-300 bg-white px-6 py-3 text-center font-semibold text-[14px] text-zinc-900 no-underline";

	return (
		<Button href={href} className={variant === "primary" ? primaryClasses : secondaryClasses}>
			{text}
		</Button>
	);
};

export default EmailButton;
