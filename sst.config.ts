/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "awsymphony",
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["prod"].includes(input?.stage),
      home: "aws",
      region: "eu-west-3",
      providers: {
        aws: {
          profile: "sst",
        },
        cloudflare: "6.11.0",
        neon: "0.9.0",
      },
    };
  },
  async run() {
    (await import("./infra/common")).startCommon();
    // (await import("./infra/auth")).startAuth();
  },
});
