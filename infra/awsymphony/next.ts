import { domain } from "../common/dns";
import { neonDatabase } from "../common/neon";
import { createNext } from "../templates/web";

export const next = createNext({
  name: "NextApp",
  path: "packages/web",
  domain,
  otherConfig: {
    link: [neonDatabase.neonLink],
  }
});
