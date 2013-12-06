Controller = require 'controllers/base/controller'
HeaderView = require 'views/home/header-view'
AddPageView = require 'views/home/add-page-view'
# Model = require 'models/head-to-head/model'

module.exports = class AddController extends Controller
	beforeAction: ->
		super

		# @model = new Model
		# @model.fetch()

		@compose 'header', HeaderView, 
			region: 'header'

	index: ->
		@view = new AddPageView 
			region: 'main'