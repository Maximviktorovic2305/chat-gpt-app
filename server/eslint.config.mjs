import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = dirname(fileURLToPath(import.meta.url));

export default tsEslint.config(
  {
    ignores: ['node_modules', 'dist', 'generated', 'eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommendedTypeChecked,
  pluginPrettier,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: configDir,
      },
    },
    rules: {
      'prettier/prettier': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
);
