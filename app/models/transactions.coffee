Collection = require '/models/base/collection'
Transaction = require '/models/transaction'

module.exports = class Transactions extends Collection

  model: Transaction
  localStorage: new Backbone.LocalStorage 'transactions-list'

