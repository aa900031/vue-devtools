const path = require('path')
const { createConfig } = require('@vue-devtools/build-tools')
const CopyPlugin = require('copy-webpack-plugin')

const target = {
  chrome: 52,
  firefox: 48,
  safari: 9,
  ie: 11,
}

module.exports = createConfig({
  entry: {
    hook: './src/browser/hook.ts',
    client: './src/browser/client.ts',
  },
  output: {
    path: path.join(__dirname, '/lib/assets'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        './public',
      ],
    }),
  ],
}, target)
