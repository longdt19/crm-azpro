const config = require('../src/config')
const merge = require('webpack-merge')

module.exports = merge(config, {
  NODE_ENV: '"production"'
})
