module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended'],
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['import', 'jest', 'prettier'],

  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
    },
  ],
  rules: {
    'sort-imports': [
      'error',
      { ignoreDeclarationSort: true, ignoreMemberSort: false },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-unused-modules': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        distinctGroup: true,
        alphabetize: {
          caseInsensitive: false,
          order: 'asc',
          orderImportKind: 'asc',
        },
        'newlines-between': 'always',
        warnOnUnassignedImports: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true,
      },
    ],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
