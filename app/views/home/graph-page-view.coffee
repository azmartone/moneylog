CollectionView = require 'views/base/collection-view'

module.exports = class GraphPageView extends CollectionView

	autoRender: true
	renderItems: false
	className: 'transactions-container'

	render: () ->
		super

	attach: () ->
		super
		#D3 uses its own selector, so render after container is on DOM
		@renderSubviews()

	renderSubviews: () ->
		classSelector = ".#{@$el.attr 'class'}"
		data = [@getTotalsByCategory()]
		@renderD3(classSelector, data)

	getTotalsByCategory: ()->
		transactions = @collection.models
		totals = []
		for transaction in transactions
			category = transaction.get 'category'
			categoryExists = no
			for total in totals
				if total.category is category
					categoryExists = yes
					total.amount += parseFloat transaction.get 'amount'
					break
			if not categoryExists
				total =
					amount: parseFloat transaction.get 'amount'
					category: category
				totals.push total

		totals

	renderD3: (selector, data) ->
		cspacing = 40
		cmargin = 10
		cpadding = 5
		cwidth = 450
		cheight = 200
		maxAmount = 450
		barHeight = 20
		teamNameWidth = 100

		svg = d3.select(selector).append("svg").attr("class", "chart").attr("width", cwidth + teamNameWidth).attr("height", 1000)
		leagueGroup = svg.selectAll("g").data(data).enter().append("g").attr("transform", (d, i) ->
			"translate(0," + ((cheight + cmargin) * i + cspacing * i) + ")"
		)

		leagueBG = leagueGroup.append("rect").attr("x", cmargin).attr("y", cmargin).attr("width", cwidth + teamNameWidth).attr("height", cheight - 2 * cmargin)
		leagueLabel = leagueGroup.append("text").attr("y", cheight + 10).attr("x", cmargin).text((d) ->
			d.key
		)

		#Functions for x and y
		y = d3.scale.ordinal().domain(data).rangeBands([0, cheight])
		x = d3.scale.linear().domain([0, maxAmount]).range([0, cwidth])

		axis = d3.svg.axis().scale(x)

		#Axis
		numericAxisGroup = leagueGroup.append("g").attr("class", "axis").attr("transform", "translate(" + teamNameWidth + "," + cheight + ")").call(axis)

		#Team specific
		barGroup = leagueGroup.selectAll("team").data((d) ->
			d
		).enter().append("g").attr("transform", (d, i) ->
			"translate(" + teamNameWidth + "," + (cmargin + cpadding + i * (barHeight + 1)) + ")"
		)
		barGroup.append("text").attr("class", "title").text((d) ->
			d.category
		).style("text-anchor", "end").attr "transform", "translate(-6," + barHeight * 2 / 3 + ")"
		
		barGroup.append("rect").attr("class", "bar").attr("height", barHeight).attr("width", 0).transition().duration(1000).delay((d, i) ->
			i * 100
		).attr "width", (d) ->
			amount = if d.amount > 0 then d.amount else 0
			x amount
