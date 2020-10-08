const path = require('path')
const env = process.env.NODE_ENV
var ip = require('ip')
const { merge } = require('webpack-merge')
const master = require('./webpackMaster')

const config = merge(master, {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, '../source/server/index.js')],
  output: {
    path: path.resolve(__dirname, '../api'),
    filename: 'server_render.js',
    libraryTarget: 'commonjs',
    publicPath: env === 'development' ? `http://${ip.address()}:8080/public/` : '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          emitFile: true
        }
      }
    ]
  },
  target: 'node'
})

module.exports = config
