const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',

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
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
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
    })
  ]
};
