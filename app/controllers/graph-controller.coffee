Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
GraphPageView = require 'views/home/graph-page-view'
Transactions = require 'models/transactions'

module.exports = class GraphController extends Controller
	beforeAction: ->
		super

		@transactions = new Transactions
		@transactions.fetch()

		@compose 'header', HeaderView, 
			region: 'header'

	index: ->
		@view = new GraphPageView 
			region: 'main'
			collection: @transactions
