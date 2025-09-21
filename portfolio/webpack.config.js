import path from 'path';
import { fileURLToPath } from 'url';

import { plugins } from './config/webpack/plugins.js';
import { rules } from './config/webpack/rules.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-undef
const mode = process.env.NODE_ENV || 'development';
const isDevMode = mode === 'development';

const target = isDevMode ? 'web' : 'browserslist';
const devtool = isDevMode ? 'source-map' : undefined;

export default {
  mode,
  target,
  devtool,
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist/portfolio'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    static: path.resolve(__dirname, './dist/portfolio'),
    port: 8080,
    client: {
      logging: 'none',
      overlay: false
    },
    compress: true,
    liveReload: true,
    open: true,
    hot: false
  },
  plugins,
  module: {
    rules
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      blocks: path.resolve(__dirname, 'src/blocks'),
      constants: path.resolve(__dirname, 'src/constants'),
      docs: path.resolve(__dirname, 'src/docs'),
      pages: path.resolve(__dirname, 'src/pages'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  }
};
