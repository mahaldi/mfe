const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')
const domain = process.env.PRODUCTION_DOMAIN // course 51, futher info on course 68
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')
const assetPath = './static'

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        }),
        new WebpackPwaManifest({
            publicPath: '/container/latest/',
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

module.exports = merge(commonConfig, prodConfig)