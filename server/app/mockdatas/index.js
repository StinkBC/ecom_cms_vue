/* mockdatas.js*/

const route = function(path, callback) {
  if (path.includes('/admin/info')) {
    const body = require('./admin_info')
    callback(body)
  }

  if (path.includes('/db/list')) {
    const body = require('./db_list')
    callback(body)
  }

  if (path.includes('/db/query')) {
    const body = require('./db_query')
    callback(body)
  }

  if (path.includes('/db/excel')) {
    const body = require('./db_excel')
    callback(body)
  }

  if (path.includes('/htmlbulider/models')) {
    const body = require('./html_models')
    callback(body)
  }
}

module.exports = route
