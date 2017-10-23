const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
//const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const path = require('path')

module.exports = merge(base, {
  target: 'node',
  devtool: false,
  entry: '../wd.m.introducev2.view.js',
  output: {
    filename: 'wd.m.introduce.serverbundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {

  },
  externals: Object.keys(require('./package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"',
        'isBrowser': false
    })
    // new VueSSRPlugin({
    //   filename: 'couselist-server-bundle.json'
    // })
  ]
})
