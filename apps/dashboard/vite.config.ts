import { defineConfig, mergeConfig } from "vite";
import { reactConfig } from "../../packages/config/vite/react.js";

// https://vite.dev/config/
export default mergeConfig(
  reactConfig,
  defineConfig({
    server: {
      port: 5174,
      strictPort: true,
    },
  }),
);
