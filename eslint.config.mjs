import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser, ecmaVersion: 12, sourceType: 'module' } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 0,
      '@typescript-eslint/no-explicit-any': 0,
    },
    ignores: ['/node_modules', 'dist'],
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
