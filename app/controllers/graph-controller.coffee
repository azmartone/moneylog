Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
GraphPageView = require 'views/home/graph-page-view'
Transactions = require 'models/transactions'

module.exports = class GraphController extends Controller
	beforeAction: ->
		super

		# @model = new Model
		# @model.fetch()

		@compose 'header', HeaderView, 
			region: 'header'

	index: ->
		@view = new GraphPageView 
			region: 'main'
			collection: new Transactions