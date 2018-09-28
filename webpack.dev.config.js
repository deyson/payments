const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    "home": path.resolve(__dirname, 'src/entries/home.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    port: 9000,
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      PAYMENTEZ_CLIENT_APPLICATION_CODE: JSON.stringify('EXITO-CO-CLIENT'),
      PAYMENTEZ_CLIENT_APPLICATION_KEY: JSON.stringify('L0KxqMO32mRSBZkzkY71hG4dUWwPLM'),
      PAYMENTEZ_SERVER_APPLICATION_CODE: JSON.stringify('EXITO-CO-SERVER'),
      PAYMENTEZ_SERVER_APPLICATION_KEY: JSON.stringify('cvNBJXzsdcH4qpgLq7tlkdtaclIvp2'),
      PAYMENTEZ_ENVIRONMENT: JSON.stringify('stg'),
      PAYMENTEZ_API_VERIFY_URL: JSON.stringify('https://ccapi-stg.paymentez.com/v2/transaction/verify'),
    }),
  ],
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
          }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]',
          }
        }
      },
    ]
  }
}
