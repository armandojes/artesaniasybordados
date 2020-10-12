const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV
const ExtracCssPlugin = require('mini-css-extract-plugin')
var ip = require('ip')

const configMaster = {
  mode: env,
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
          ]
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
      publicPath: JSON.stringify(env === 'development' ? `http://${ip.address()}:8080/public` : '/public')
    }),
    new ExtracCssPlugin({
      filename: 'styles.css'
    })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.jpg', '.png', '.gif', '.svg'],
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
  watch: env === 'development'
}

module.exports = configMaster
