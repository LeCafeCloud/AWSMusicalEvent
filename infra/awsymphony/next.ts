import { domain } from "../common/dns";
import { dynamoST } from "../common/dynamo";
import { neonDatabase } from "../common/neon";
import { allOAuthSecrets, secrets } from "../common/secrets";
import { createNext } from "../templates/web";

export const next = createNext({
	name: "NextApp",
	path: "packages/web",
	domain,
	otherConfig: {
		link: [neonDatabase.neonLink, dynamoST, secrets.betterAuthSecret, ...allOAuthSecrets],
	},
});
