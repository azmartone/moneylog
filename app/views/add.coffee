CollectionView = require 'views/base/view'
GameEventView = require './game-event-view'
TabsView = require './tabs-view'

module.exports = class AddView extends View

  className: 'add-container'
  template: require './templates/add'

  initialize: () ->
    super
  
  attach: () ->
    super
