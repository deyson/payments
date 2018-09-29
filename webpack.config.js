const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

module.exports = (env) => {
  const plugins = [
    new CleanWebpackPlugin(['dist'], {root: __dirname}),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.DefinePlugin({
      PAYMENTEZ_CLIENT_APPLICATION_CODE: JSON.stringify('EXITO-CO-CLIENT'),
      PAYMENTEZ_CLIENT_APPLICATION_KEY: JSON.stringify('L0KxqMO32mRSBZkzkY71hG4dUWwPLM'),
      PAYMENTEZ_SERVER_APPLICATION_CODE: JSON.stringify('EXITO-CO-SERVER'),
      PAYMENTEZ_SERVER_APPLICATION_KEY: JSON.stringify('cvNBJXzsdcH4qpgLq7tlkdtaclIvp2'),
      PAYMENTEZ_ENVIRONMENT: JSON.stringify('stg'),
      PAYMENTEZ_API_VERIFY_URL: JSON.stringify('https://ccapi-stg.paymentez.com/v2/transaction/verify'),
    }),
    new HtmlWebpackPlugin({
      title: 'Exito - Carulla Payments',
      template: 'src/index.html',
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'jquery',
          entry: 'https://code.jquery.com/jquery-1.11.3.min.js',
          global: 'jQuery',
        },
        {
          module: 'paymentez-js',
          entry: 'https://cdn.paymentez.com/js/ccapi/stg/paymentez.min.js',
          global: 'paymentez-js',
        },
        {
          module: 'google-raleway',
          entry: {
            path: 'https://fonts.googleapis.com/css?family=Raleway',
            type: 'css',
          },
        },
        {
          module: 'paymentez-css',
          entry: {
            path: 'https://cdn.paymentez.com/js/ccapi/stg/paymentez.min.css',
            type: 'css',
          },
        },
      ],
    }),
  ]

  return {
    entry: {
      "home": path.resolve(__dirname, 'src/entries/home.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      publicPath: path.resolve(__dirname, 'dist')+"/",
      chunkFilename: 'js/[id].[chunkhash].js',
    },
    devServer: {
      port: 9000,
    },
    module: {
      rules: [
        {
          // test: que tipo de archivo quiero reconocer,
          // use: que loader se va a encargar del archivo
          test: /\.(js|jsx)$/, 
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-2'],
            }
          },
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                }
              }
            ]
          })
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 50000,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]',
            }
          }
        },
      ]
    },
    plugins
  }
}
