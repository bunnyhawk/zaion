const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  mode: 'production',
  // target: 'node',
  // node: { fs: "empty" },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'scripts'),
  },
  resolve: {
    fallback: {
      fs: false,
      os: false
    }
  },
  plugins: [
    new Dotenv(),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};