const webpack = require('webpack');
const config = require('./webpack.base');

config.devServer = {
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: 'index.html' }
    ]
  },
  hot: true,
  inline: true,
  proxy: {
    '/api': {
      changeOrigin: true,
      target: 'http://localhost:3000'
    }
  }
};

config.devtool = 'source-map';
config.mode = 'development';

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

module.exports = config;
