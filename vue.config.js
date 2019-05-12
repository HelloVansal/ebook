const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('src', resolve('src'))
      .set('styles', resolve('src/assets/styles'))
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080
  }
}
