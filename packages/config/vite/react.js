import react from "@vitejs/plugin-react";

/** @type {import('vite').UserConfig} */
export const reactConfig = {
  plugins: [react()],
  // Shared base config (aliases, build options, etc. can go here later)
};
