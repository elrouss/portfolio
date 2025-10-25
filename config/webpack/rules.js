import path from 'path';

// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PostCssPresetEnvPlugin from 'postcss-preset-env';

export const rules = [
  {
    test: /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-typescript',
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
    test: /_critical\.(css|scss)$/i,
    use: [
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
    test: /\.(css|scss)$/i,
    exclude: /_critical\.(css|scss)$/i,
    use: [
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
    test: /\.(png|jpg|jpeg|webp|ico)$/i,
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
    test: /\.(woff2)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'assets/fonts/[name][ext]'
    }
  }
];
