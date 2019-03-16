const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const devMode = process.env.ENV === 'dev' ? true : false
module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', 'css', 'scss'],
    alias: {
      '@component': path.resolve(__dirname, './src/component/'),
      '@static': path.resolve(__dirname, './static/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }, {
        test: /\.(css|scss)$/,
        use: [{
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }
        ]
      }, {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              publicPath: '../'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'static', 'index.html'),
      chunksSortMode: 'none',
      inject: true,
      compile: true,
      env:  process.env.ENV,
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })

  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
