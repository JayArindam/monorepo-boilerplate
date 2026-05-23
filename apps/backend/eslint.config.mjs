import { nodeConfig } from '../../packages/config/eslint/node.js';

export default [
  {
    ignores: ['dist', 'node_modules', 'eslint.config.mjs'],
  },
  ...nodeConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
