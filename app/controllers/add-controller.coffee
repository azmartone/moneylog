Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
AddPageView = require 'views/home/add-page-view'
Transactions = require 'models/transactions'

module.exports = class AddController extends Controller
	beforeAction: ->
		super

		@compose 'header', HeaderView, 
			region: 'header'

	index: ->
		@view = new AddPageView 
			region: 'main'
			collection: new Transactions