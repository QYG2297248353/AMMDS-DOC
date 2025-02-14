import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export const markdown = defineConfig({
  markdown: {
    math: true,
    image: {
      lazyLoading: true,
    },
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, "[!code");
        },
      },
    ],
  },
});
