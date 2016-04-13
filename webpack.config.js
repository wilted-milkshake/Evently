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
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}




























