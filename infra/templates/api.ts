import { router } from "../common/router";

export type CreateFunctionProps = {
	name: string;
	handler: string;
	apiPath: string;
	otherConfig?: Partial<sst.aws.FunctionArgs>;
};

export const createFunction = ({ name, handler, apiPath, otherConfig }: CreateFunctionProps) => {
	const func = new sst.aws.Function(name, {
		handler,
		architecture: otherConfig?.architecture || "arm64",
		memory: otherConfig?.memory || "256 MB",
		timeout: otherConfig?.timeout || "10 seconds",
    url: {
      cors: false,
      router: {
        instance: router,
        path: apiPath,
      }
    },
		...otherConfig,
	});

	return func;
};
