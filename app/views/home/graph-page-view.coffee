CollectionView = require 'views/base/collection-view'
CategoriesView = require 'views/home/categories-view'
GraphTransactionView = require 'views/home/graph-transaction-view'
Categories = require 'models/categories'
Transaction = require 'models/transaction'

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
		console.log "Show me shiet", @collection
