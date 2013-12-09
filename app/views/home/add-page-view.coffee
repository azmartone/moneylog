View = require 'views/base/view'
CategoriesView = require 'views/home/categories-view'
Categories = require 'models/categories'

module.exports = class AddView extends View

	autoRender: true
	className: 'add-container'
	template: require './templates/add'

	initialize: () ->
		super

	render: () ->
		@delegate('click', 'input[type=submit]', @addNew)
		super

	attach: () ->
		super
		@renderSubviews()

	addNew:()->
		console.log "trying to addNew"
		#Adds to the collection of transactions


	renderSubviews: () ->

		categories = new Categories

		console.log "categorie", categories

		categoriesView = new CategoriesView
			collection: categories
		categories.fetch().then => categoriesView.render()

	# When the user hits submit, add the record to the data store.
	# Do the view portion
