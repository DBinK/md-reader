const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrors = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: {
    'content-script': resolve(__dirname, '../src/main.ts'),
    background: resolve(__dirname, '../src/background.ts'),
    popup: resolve(__dirname, '../src/popup/index.ts'),
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, '../extension'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: 'svelte-loader',
      },
      {
        test: /\.(css|less)$/,
        use: [miniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|bmp|gif|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 10,
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'svg-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.svelte', '.json'],
  },
  plugins: [
    new FriendlyErrors(),
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new miniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin(
      [
        // { from: resolve(PROJECT_ROOT, 'template'), ignore: ['*.html'] },
        {
          from: resolve(__dirname, '../src/manifest.json'),
        },
        {
          from: resolve(__dirname, '../src/images'),
          to: 'images',
          ignore: ['*-crx.jpg', '*-crx.png'],
        },
        {
          from: resolve(__dirname, '../src/popup/index.html'),
          to: 'popup.html',
        },
      ],
      {
        copyUnmodified: true,
      },
    ),
  ],
}
