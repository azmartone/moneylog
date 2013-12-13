CollectionView = require 'views/base/collection-view'
CategoriesView = require 'views/home/categories-view'
Categories = require 'models/categories'
Transaction = require 'models/transaction'
View = require 'views/base/view'

module.exports = class AddView extends CollectionView

	autoRender: true
	renderItems: false
	className: 'add-container'
	template: require './templates/add'
	itemView: View

	render: () ->
		super

	attach: () ->
		super
		@renderSubviews()

	addNew:()=>
		if @amount.val().length > 0 and @description.val().length > 0
			model = new Transaction
				amount: @amount.val()
				description: @description.val()
				category: @categoriesView.selected
			@collection.add model

			model.save()
			@message.html('Transaction Logged')
			setTimeout((=>
				@message.html('')), 1000)
			@resetForm()
		else
			alert 'Fill in your fields'

	resetForm: () ->
		@amount.val('')
		@description.val('')

	renderSubviews: () ->
		messageSelector = '.message-container'
		amountSelector = 'input[name=amount]'
		descriptionSelector = 'input[name=description]'

		@amount = $(amountSelector)
		@message = $(messageSelector)
		@description = $(descriptionSelector)

		@delegate('click', 'input[type=submit]', @addNew)

		categories = new Categories

		@categoriesView = new CategoriesView
			collection: categories
		categories.fetch().then => @categoriesView.render()