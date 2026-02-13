import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  // Base
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,  
      sourceType: "module",
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    rules: {
      "@typescript-eslint/naming-convention": ["warn", {
        selector: "import",
        format: ["camelCase", "PascalCase"],
      }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
        }
      ],

      curly: ["warn", "multi-line"],
      eqeqeq: "warn",
      "no-throw-literal": "warn",
      semi: "warn",
    },
  },
  // Client
  {
    files: ["src/**/*.{ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [],
  },
])
