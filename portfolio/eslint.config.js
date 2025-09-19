import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts}', 'eslint.config.js'],
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/arrow-parens': 'error',
      '@stylistic/arrow-spacing': 'error',
      '@stylistic/comma-dangle': [
        'error',
        {
          objects: 'never'
        }
      ],
      '@stylistic/comma-spacing': 'error',
      '@stylistic/comma-style': 'error',
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/key-spacing': 'error',
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/max-statements-per-line': 'error',
      '@stylistic/member-delimiter-style': 'error',
      '@stylistic/new-parens': 'error',
      '@stylistic/newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 2
        }
      ],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': 'error',
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1
        }
      ],
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var']
        }
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/semi-spacing': 'error',
      '@stylistic/space-before-blocks': 'error',
      '@stylistic/space-in-parens': 'error',
      '@stylistic/spaced-comment': ['error', 'always'],
      '@stylistic/switch-colon-spacing': 'error',
      '@stylistic/template-curly-spacing': 'error',
      '@stylistic/type-annotation-spacing': 'error',
      '@stylistic/type-generic-spacing': 'error',
      '@stylistic/type-named-tuple-spacing': 'error',
      '@stylistic/wrap-regex': 'error',

      'accessor-pairs': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      camelcase: 'error',
      'consistent-return': 'error',
      curly: 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'always'],
      'func-style': ['error', 'expression'],
      'max-classes-per-file': 'error',
      'max-params': ['error', 3],
      'no-alert': 'error',
      'no-console': 'warn',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-extra-bind': 'error',
      'no-implicit-globals': 'error',
      'no-nested-ternary': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-undefined': 'error',
      'no-unneeded-ternary': 'error',
      'no-use-before-define': 'error',
      'no-useless-constructor': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': 'error',
      'prefer-template': 'error',
      semi: 'error'
    }
  },
  {
    ignores: ['node_modules/*', 'dist/*', 'config/*', 'webpack.config.ts']
  },
  pluginJs.configs.recommended
];
