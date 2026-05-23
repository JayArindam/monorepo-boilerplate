import { nodeConfig } from "../config/eslint/node.js";

export default [
  {
    ignores: ["dist", "node_modules", "eslint.config.js"],
  },
  ...nodeConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
