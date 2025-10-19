// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs', 'node_modules/', 'dist/', 'build/', 'coverage/', '../.idea/'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-call': 'off',

            // Disable formatting rules (handled by Prettier)
            indent: 'off',
            'linebreak-style': 'off',
            quotes: 'off',
            semi: 'off',
            'comma-dangle': 'off',
            'max-len': 'off',
            'object-curly-spacing': 'off',
            'array-bracket-spacing': 'off',
        },
    },
);
