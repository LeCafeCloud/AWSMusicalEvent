import { configLink } from "../common/config";
import { domains, urlsLink } from "../common/dns";
import { dynamoST } from "../common/dynamo";
import { email } from "../common/email";
import { neonDatabase } from "../common/neon";
import { allOAuthSecrets, secrets } from "../common/secrets";
import { createNext } from "../templates/web";

export const next = createNext({
	name: "NextApp",
	path: "packages/web",
	domain: domains.awsymphony,
	otherConfig: {
		link: [
			email,
			neonDatabase.neonLink,
			dynamoST,
			secrets.betterAuthSecret,
			...allOAuthSecrets,
			urlsLink,
			configLink,
		],
	},
});
