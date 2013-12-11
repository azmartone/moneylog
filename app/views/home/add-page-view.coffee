CollectionView = require 'views/base/collection-view'
CategoriesView = require 'views/home/categories-view'
AddPageTransactionView = require 'views/home/add-page-transaction-view'
Categories = require 'models/categories'
Transaction = require 'models/transaction'

module.exports = class AddView extends CollectionView

	autoRender: true
	className: 'add-container'
	template: require './templates/add'
	itemView: AddPageTransactionView

	render: () ->
		super

	attach: () ->
		super
		@renderSubviews()

	addNew:()->
		console.log @amount
		console.log @amount.val()
		console.log @description.val()
		if @amount.val().length > 0 and @description.val().length > 0
			model = new Transaction
				amount: @amount.val()
				description: @description.val()
				category: @categoriesView.selected
			console.log 'added model', model
			@collection.add model

			console.log @collection
			model.save()
		else
			alert 'Fill in your fields'


	renderSubviews: () ->

		amountSelector = 'input[name=amount]'
		descriptionSelector = 'input[name=description]'
		@amount = $(amountSelector)
		@description = $(descriptionSelector)

		@delegate('click', 'input[type=submit]', @addNew)
		@delegate('change', amountSelector, @onAmountChange)
		@delegate('change', descriptionSelector, @onDescriptionChange)

		categories = new Categories

		console.log "categorie", categories

		@categoriesView = new CategoriesView
			collection: categories
		categories.fetch().then => @categoriesView.render()

	onAmountChange: () ->
		console.log 'amount changed'

	onDescriptionChange: () ->
		console.log 'description changed'