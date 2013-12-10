Collection = require '/models/base/collection'
Category = require '/models/category'

module.exports = class Categories extends Collection

  url: 'test-data/categories.json'
  model: Category
  parse:(response)->
  	console.log "response", response
  	response.data

