CollectionView = require 'views/base/collection-view'
CategoryView = require 'views/home/category-view'

module.exports = class CategoriesView extends CollectionView
	autoRender: true
	className: 'categories'
	itemView: CategoryView
	tagName: 'select'
	container: '.category-container'

	attach:()->
		@selected = $(@el).val()
		@delegate 'change', @onChange
		super

	onChange:()=>
		@selected = $(@el).val()