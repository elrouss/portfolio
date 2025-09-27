import { nanoid } from 'nanoid';
import HtmlBundlerPlugin from 'html-bundler-webpack-plugin';
import SVGSpriteLoaderPlugin from 'svg-sprite-loader/plugin.js';

export const plugins = [
  new HtmlBundlerPlugin({
    entry: [
      {
        import: 'src/pages/index.html',
        filename: 'index.html'
      }
    ],
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
