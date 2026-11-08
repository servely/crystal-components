import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-links", "storybook-i18n"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
