import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginAstro from 'eslint-plugin-astro'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

import { includeIgnoreFile } from '@eslint/compat'
import { fileURLToPath } from 'node:url'

export default [
  includeIgnoreFile(fileURLToPath(import.meta.resolve('./.gitignore'))),
  eslint.configs.recommended,
  ...tseslint.configs['recommended'],
  ...pluginAstro.configs['flat/recommended'],
  ...pluginVue.configs['flat/recommended'],
  pluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      'prettier/prettier': 'error',
    },
  },
]
