const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')
const assetPath = './static'

const devConfig = {
    mode: 'development',
    output: {
      publicPath: 'http://localhost:8080/'
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js'
            },
            shared: packageJson.dependencies
        }),
        new WebpackPwaManifest({
            publicPath: '/',
            name: 'My Progressive Web App',
            short_name: 'MyPWA',
            description: 'My awesome Progressive Web App!',
            background_color: '#ffffff',
            // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
            icons: [
              {
                src: path.resolve(`${assetPath}/logo512.png`),
                size: '512x512' // you can also use the specifications pattern
              }
            ]
        })
    ]
}

module.exports = merge(commonConfig, devConfig)