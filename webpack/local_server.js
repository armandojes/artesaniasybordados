const path = require('path')
const webpack = require('webpack')
const env = process.env.NODE_ENV
const ExtracCssPlugin = require('mini-css-extract-plugin')

const config = {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, '../source/localserver.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
    libraryTarget: 'commonjs',
    publicPath: env === 'development' ? 'http://localhost:8080/public/' : 'http://localhost:3000/public/'
  },
  mode: 'development',
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
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          emitFile: false
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
      publicPath: JSON.stringify(env === 'development' ? 'http://localhost:8080/public' : 'http://localhost:3000/public')
    }),
    new ExtracCssPlugin({
      filename: 'styles.css'
    })
  ],
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
  target: 'node',
  watch: true
}

module.exports = config
