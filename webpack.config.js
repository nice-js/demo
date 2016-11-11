const rucksack = require('rucksack-css')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    bundle: ['webpack-hot-middleware/client', './index.js'],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/[name].[hash:16].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.css$/,
      include: /src/,
      loaders: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
        'postcss-loader'
      ]
    }, {
      test: /\.css$/,
      exclude: /src/,
      loader: 'style!css'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: [
        'react-hot',
        'babel-loader'
      ]
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new HtmlWebpackPlugin({
      title: 'admin',
      alwaysWriteToDisk: true,
      template: './index.html',
      filename: '../dist/index.html',
      minify: {
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new CopyWebpackPlugin([{
      from: '../public',
      to: '../dist'
    }], {
      ignore: ['.DS_Store']
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendors.[hash:16].js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
