View = require 'views/base/view'

module.exports = class CategoryView extends View
	autoRender: true
	className: 'category'
	template: require './templates/category'
	tagName: 'option'

	getTemplateData: ()->
		@model.attributes