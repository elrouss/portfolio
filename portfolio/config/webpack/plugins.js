import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SVGSpriteLoaderPlugin from 'svg-sprite-loader/plugin.js';

export const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/pages/index.html'
    // hash: true
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css'
  }),
  new SVGSpriteLoaderPlugin({ plainSprite: true })
];
