const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const statConf = {
  errorDetails: true,
  warnings: true,
  version: false,
  assets: false,
  chunks: false,
  errors: true,
  hash: false
}
const alias = {
  'project-components': path.resolve('./components'),
  'project-services': path.resolve('./services')
}
module.exports = env => {
  let outputCSS = './dist/bundle.css'
  let outputJS = './dist/bundle.js'
  let devtool = 'source-map'
  if (env === 'production-p') {
    outputJS = './dist/bundle.min.js'
    outputCSS = './dist/bundle.min.css'
    devtool = false
  }
  return ({
    entry: ['babel-polyfill', './app/main.js'],
    output: {
      filename: outputJS
    },
    devtool: devtool,
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ],
      rules: [
        {
          test: /\.(js|jsx?)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['es2015', {'modules': false}], 'stage-0', 'react']
              }
            }
          ]
        },
        {
          test: /\.styl$/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
          }))
        },
        {
          test: /\.css/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          }))
        },
        {
          test: /\.(img|png|svg)$/,
          use: 'url-loader'
        }
      ]
    },
    devServer: {
      stats: statConf,
      port: '3000'
    },
    plugins: [
      new ExtractTextPlugin(outputCSS)
    ],
    resolve: {
      alias
    }
  })
}
