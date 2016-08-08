module.exports.register = register
module.exports.register.attributes = {
  name: 'hoodie'
}

var corsHeaders = require('hapi-cors-headers')
var hoodieServer = require('@hoodie/server').register

var registerPlugins = require('./plugins')

function register (server, options, next) {
  server.register({
    register: hoodieServer,
    options: options
  }, function (error) {
    if (error) {
      return next(error)
    }

    server.ext('onPreResponse', corsHeaders, {
      sandbox: 'plugin'
    })

    registerPlugins(server, options, function (error) {
      if (error) {
        return next(error)
      }

      next(null, server, options)
    })
  })
}
