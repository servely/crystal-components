import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "scope-enum": [
      RuleConfigSeverity.Error,
      "always",
      ["deps", "deps-dev", "de", "en"],
    ],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build",
        "ci",
        "docs",
        "feat",
        "fix",
        "lang",
        "perf",
        "refactor",
        "release",
        "test",
      ],
    ],
    "header-max-length": [RuleConfigSeverity.Error, "always", 72],
    "body-max-line-length": [RuleConfigSeverity.Error, "always", Infinity],
    // Disable max footer length because of too many false positives (body with issue reference, footer with BREAKING CHANGES). See also conventional-changelog/commitlint#3364
    "footer-max-line-length": [RuleConfigSeverity.Error, "always", Infinity],
  },
};

export default config;
