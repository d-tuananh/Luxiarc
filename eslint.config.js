import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginAstro from "eslint-plugin-astro"

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Các quy tắc custom cho dự án chuyên nghiệp
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },
  {
    // Tắt các quy tắc kiểm tra kiểu cho các file build, dependencies hoặc config
    ignores: [
      "dist/**/*",
      "dist.bak/**/*",
      ".astro/**/*",
      "node_modules/**/*",
      "astro.config.mjs"
    ],
  }
)
