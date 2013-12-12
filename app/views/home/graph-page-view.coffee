CollectionView = require 'views/base/collection-view'
GraphTransactionView = require 'views/home/graph-transaction-view'

module.exports = class GraphPageView extends CollectionView

	autoRender: true
	className: 'transactions-container'
	template: require './templates/graph'
	itemView: GraphTransactionView

	render: () ->
		super

	attach: () ->
		@renderSubviews()
		super

	renderSubviews: () ->
		console.log @getTotalsByCategory()

	getTotalsByCategory: ()->
		transactions = @collection.models
		totals = {}
		for transaction in transactions
			category = transaction.get 'category'
			if totals.hasOwnProperty category
				totals[category] += parseFloat transaction.get 'amount'
			else
				totals[category] = parseFloat transaction.get 'amount'
		totals