const CompressionPlugin = require('compression-webpack-plugin');
// TODO: May not need to define webpack
const webpack = require('webpack');
const config = require('./webpack.base');

config.bail = true;
config.devtool = 'cheap-module-source-map';
config.mode = 'production';

config.optimization = {
  minimize: true
};

config.profile = false;

config.plugins = config.plugins.concat([
  new CompressionPlugin()
]);


module.exports = config;
