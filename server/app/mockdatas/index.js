/* mockdatas.js*/

const route = function(path, callback) {
  if (path.includes('/admin/info')) {
    const body = require('./admin_info')
    callback(body)
  }
}

module.exports = route
