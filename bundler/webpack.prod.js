const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'production'
    }
)
