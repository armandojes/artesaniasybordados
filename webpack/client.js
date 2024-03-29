const path = require('path')
const env = process.env.NODE_ENV
const webpack = require('webpack')
const ExtracCssPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
var ip = require('ip')

const config = {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, '../source/client.js')],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app.js',
    publicPath: env === 'development' ? `http://${ip.address()}:8080/public/` : 'https://artstest.vercel.app/public/'
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/(node_modules)/',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ],
          plugins: [
            isDevelopment && require.resolve('react-refresh/babel')
          ].filter(Boolean)
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          emitFile: true
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: ExtracCssPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.NODE_ENV),
      publicPath: JSON.stringify(env === 'development' ? `http://${ip.address()}:8080/public/` : '/public')
    }),
    new ExtracCssPlugin({
      filename: 'styles.css'
    }),
    isDevelopment && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: ip.address(),
    port: 8080,
    disableHostCheck: true,
    hot: true,
    hotOnly: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.jpg', '.png', '.gif', '.svg'],
    alias: {
      flux: path.resolve(__dirname, '../source/app/flux'),
      api: path.resolve(__dirname, '../source/app/api.js'),
      hooks: path.resolve(__dirname, '../source/app/hooks'),
      helpers: path.resolve(__dirname, '../source/app/helpers'),
      components: path.resolve(__dirname, '../source/app/components'),
      config: path.resolve(__dirname, '../source/config'),
      models: path.resolve(__dirname, '../source/api/models'),
      core: path.resolve(__dirname, '../source/app/core')
    }
  },
  target: 'web',
  watch: env === 'development'
}

module.exports = config
