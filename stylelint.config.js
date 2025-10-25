/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['after-same-name', 'first-nested'],
        ignore: [
          'blockless-after-same-name-blockless',
          'blockless-after-blockless',
          'inside-block'
        ],
        ignoreAtRules: ['mixin', 'function']
      }
    ],
    'custom-property-empty-line-before': [
      'always',
      {
        ignore: ['after-custom-property', 'first-nested']
      }
    ],
    'scss/dollar-variable-empty-line-before': null
  }
};
