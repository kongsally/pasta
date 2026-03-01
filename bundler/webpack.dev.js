const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const portFinderSync = require('portfinder-sync')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devServer:
        {
            host: '0.0.0.0',
            port: portFinderSync.getPort(8080),
            static:
            {
                directory: './dist',
                watch: true
            },
            open: true,
            allowedHosts: 'all',
            client:
            {
                overlay: true,
                logging: 'warn'
            }
        }
    }
)
