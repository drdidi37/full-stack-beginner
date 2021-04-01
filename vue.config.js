const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@packages', path.resolve('packages'))
      .end()
  }
}
