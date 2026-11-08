import type { Options } from "semantic-release";

const config: Options = {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "build", scope: "deps", release: "patch" },
          { type: "lang", release: "patch" },
        ],
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            {
              type: "feat",
              section: "Features",
              hidden: false,
            },
            {
              type: "fix",
              section: "Bug Fixes",
              hidden: false,
            },
            {
              type: "perf",
              section: "Performance Improvements",
              hidden: false,
            },
            {
              type: "lang",
              section: "Translation Updates",
              hidden: false,
            },
            {
              type: "build",
              scope: "deps",
              hidden: false,
              section: "Dependency updates",
            },
          ],
        },
      },
    ],
    "@semantic-release/github",
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: [["**/package*.json", "!node_modules/**"]],
        message: "release: ${nextRelease.version}",
      },
    ],
  ],
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    { name: "next", prerelease: true },
    { name: "next-major", prerelease: true },
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
};

export default config;
