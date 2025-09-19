import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PostCssPresetEnvPlugin from 'postcss-preset-env';

export const rules = [
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: 3
            }
          ]
        ]
      }
    }
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              '...',
              {
                tag: 'use',
                attribute: 'xlink:href',
                type: 'src',
                filter: () => false
              }
            ]
          }
        }
      }
    ]
  },
  {
    test: /\.(css|scss)$/i,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [PostCssPresetEnvPlugin()]
          }
        }
      },
      'sass-loader'
    ]
  },
  {
    test: /\.(png|jpg|jpeg|webp)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/images/[name].[contenthash:8][ext]'
    }
  },
  {
    test: /\.svg$/,
    include: path.resolve(process.cwd(), 'src/assets/icons'),
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          spriteFilename: 'sprite.svg',
          publicPath: '/',
          symbolId: 'ic-[name]'
        }
      },
      'svgo-loader'
    ]
  },
  {
    test: /\.(woff|woff2|ttf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name].[contenthash:8][ext]'
    }
  }
];
