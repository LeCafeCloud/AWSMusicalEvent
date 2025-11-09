const PRODUCTION = "awsymphony.com";
const DEV = `dev.${PRODUCTION}`;
const DEMO = `demo.${PRODUCTION}`;

export const { domain } = (() => {
	if ($app.stage === "prod")
		return {
			domain: PRODUCTION,
		};

	if ($app.stage === "dev")
		return {
			domain: DEV,
		};

	if ($app.stage === "demo")
		return {
			domain: DEMO,
		};

	// Pour les stages personnels, le cookieDomain doit être le parent (dev.askmy.cloud)
	return {
		domain: `${$app.stage}.${DEV}`,
	};
})();

export const domains = {
	get awsymphony() {
		return domain;
	},

	get docs() {
		return `docs.${domain}`;
	},
} as const;

export const urls = {
	get awsymphony() {
		return `https://${domain}`;
	},

	get docs() {
		return `https://${domains.docs}`;
	},
} as const;

export const urlsLink = new sst.Linkable("Urls", {
	properties: {
		// Domaines
		domain: domain,
		docsUrl: urls.docs,
		awsymphonyUrl: urls.awsymphony,
	},
});
