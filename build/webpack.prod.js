const merge = require('webpack-merge')
const commentConfig = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(commentConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  },
})
