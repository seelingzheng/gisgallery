<<<<<<< HEAD
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
module.exports = {
  baseUrl: '',
  lintOnSave: false,
  configureWebpack: {

    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: path.join(cesiumSource, cesiumWorkers),
        to: 'Workers'
      }]),
      new CopyWebpackPlugin([{
        from: path.join(cesiumSource, 'Assets'),
        to: 'Assets'
      }]),
      new CopyWebpackPlugin([{
        from: path.join(cesiumSource, 'Widgets'),
        to: 'Widgets'
      }]),
      new CopyWebpackPlugin([{
        from: path.join(cesiumSource, 'ThirdParty/Workers'),
        to: 'ThirdParty/Workers'
      }]),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      })
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }

  },
};
=======
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
    },
  },
};
>>>>>>> master
