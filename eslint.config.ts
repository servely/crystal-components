import withNuxt from "@nuxt/eslint-config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import storybook from "eslint-plugin-storybook";

export default withNuxt(
  {},
  eslintPluginPrettierRecommended,
  ...storybook.configs["flat/recommended"],
  { ignores: ["!.storybook"] },
  {
    rules: {
      "no-console":
        process.env.NODE_ENV === "production"
          ? [
              "error",
              {
                allow: ["warn", "error"],
              },
            ]
          : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  },
);
