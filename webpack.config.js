var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './client/main.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'main_bundle.js'
  },
  module: {
    loaders: [
      // {test: /\.js$/, include: __dirname + '/client', loader: 'babel-loader'}
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}




























