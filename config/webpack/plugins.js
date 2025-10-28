import { nanoid } from 'nanoid';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';
import SVGSpriteLoaderPlugin from 'svg-sprite-loader/plugin.js';
import pageData from '../../src/data/pages/index.json' assert { type: 'json' };

export const plugins = [
  new HtmlBundlerPlugin({
    entry: {
      index: {
        import: 'src/pages/index.njk',
        data: pageData
      }
    },
    preprocessor: 'nunjucks',
    js: {
      filename: '[name].[contenthash:8].js'
    },
    css: {
      filename: ({ chunk }) =>
        `${chunk.name.replace(/_/, '')}.${nanoid(8).toLowerCase()}.css`
    },
    minify: 'auto'
  }),
  new SVGSpriteLoaderPlugin({ plainSprite: true })
];
