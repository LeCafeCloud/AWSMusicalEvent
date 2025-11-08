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
			dns: sst.cloudflare.dns(),
		},
		dev: {
			url: $dev ? "http://localhost:3000" : `https://${domain}`,
		},
		...otherConfig,
	});
};
