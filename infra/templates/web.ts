export type CreateNextProps = {
	name: string;
	path: string;
	domain: string;
	otherConfig?: Partial<sst.aws.NextjsArgs>;
};

export const createNext = ({ name, path, domain, otherConfig }: CreateNextProps) => {
	return new sst.aws.Nextjs(name, {
		path,
		domain: {
			name: domain,
			dns: sst.cloudflare.dns({
				proxy: true,
			}),
		},
		...otherConfig,
	});
};

export type CreateAstroProps = {
	name: string;
	path: string;
	domain: string;
	otherConfig?: Partial<sst.aws.AstroArgs>;
};

export const createAstro = ({ name, path, domain, otherConfig }: CreateAstroProps) => {
	return new sst.aws.Astro(name, {
		path,
		domain: {
			name: domain,
			dns: sst.cloudflare.dns({
				proxy: true,
			}),
		},
		...otherConfig,
	});
};
