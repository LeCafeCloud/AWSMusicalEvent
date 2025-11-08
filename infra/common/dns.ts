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
