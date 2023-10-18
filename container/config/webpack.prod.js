const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')
const domain = process.env.PRODUCTION_DOMAIN // course 51, futher info on course 68
const WebpackPwaManifest = require('webpack-pwa-manifest')
const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin');
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
            start_url: '/?utm_source=homescreen',
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
        }),
        new WorkboxPlugin.GenerateSW({
            swDest: 'service-worker.js',
            exclude: [
                /\.map$/, // source maps
                /^manifest.*\.js(?:on)?$/, // web app manifest
                /icons-[a-z0-9]+\/[a-z0-9_-]+\.png$/, // icons
                /icons-[a-z0-9]+\/\.cache$/, // favicons cache file
                /node_modules\/standardized-audio-context\// // remove standardized-audio-context later
            ],
            skipWaiting: true,
            clientsClaim: true,
            cleanupOutdatedCaches: true,
            runtimeCaching: [
                {
                  urlPattern: /\.js$/,
                  handler: 'NetworkFirst',
                },
              ],
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)