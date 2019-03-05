'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.2:7300/mock/5c6fca8bcc62c125ec5c5b5c/_copy"',
})
