import { defineConfig, loadEnv } from "@rsbuild/core";

import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: publicVars,
  },
  tools: {
    rspack: {
      plugins: [
        TanStackRouterRspack({ target: "react", autoCodeSplitting: true }),
      ],
    },
  },
});
