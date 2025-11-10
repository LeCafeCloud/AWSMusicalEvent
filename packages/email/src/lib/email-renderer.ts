import { render } from "@react-email/components";
import type { ReactElement } from "react";

/**
 * Renders a React Email component to HTML
 */
export async function renderEmailTemplate(component: ReactElement): Promise<string> {
	return render(component);
}
