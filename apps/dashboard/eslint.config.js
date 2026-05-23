import { reactConfig } from "../../packages/config/eslint/react.js";

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  ...reactConfig,
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
