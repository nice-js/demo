const rucksack = require('rucksack-css')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
  module: {
    loaders: [{
      test: /\.css$/,
      include: /src/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
        'postcss-loader'
      )
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
      template: './index.html',
      filename: '../dist/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([{
      from: '../public',
      to: '../dist'
    }], {
      ignore: ['.DS_Store'],
      copyUnmodified: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/bundle.[hash:16].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendors.js'),
    new webpack.NoErrorsPlugin()
  ]
}
