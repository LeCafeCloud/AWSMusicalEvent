import { configLink } from "../common/config";
import { domains, urlsLink } from "../common/dns";
import { createAstro } from "../templates/web";

export const docs = createAstro({
	name: "Docs",
	path: "packages/docs",
	domain: domains.docs,
	otherConfig: {
		link: [urlsLink, configLink],
	},
});
