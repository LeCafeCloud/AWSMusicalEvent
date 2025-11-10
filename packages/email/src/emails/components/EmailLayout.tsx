import { Body, Container, Head, Html, Preview, Tailwind } from "@react-email/components";
import type { ReactNode } from "react";

interface EmailLayoutProps {
	preview: string;
	children: ReactNode;
}

/**
 * Reusable layout for all AWS Musical Event emails
 * Follows shadcn/ui design principles
 */
export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
	return (
		<Html>
			<Head />
			<Preview>{preview}</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-zinc-50 px-2 font-sans">
					<Container className="mx-auto my-[40px] max-w-[600px] rounded-lg border border-zinc-200 bg-white p-0 shadow-sm">
						{children}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default EmailLayout;
