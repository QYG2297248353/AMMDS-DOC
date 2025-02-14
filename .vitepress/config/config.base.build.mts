import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export const build = defineConfig({
  ignoreDeadLinks: true,
  metaChunk: true,
  srcExclude: ["**/node_modules/**", "**/README.md", "**/TODO.md"],
  outDir: "dist",
});
