import globals from "globals";
import { baseTypeCheckedConfig } from "./base.js";

/** @type {import('eslint').Linter.Config[]} */
export const nodeConfig = [
  ...baseTypeCheckedConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
