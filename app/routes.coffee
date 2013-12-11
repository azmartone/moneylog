module.exports = (match) ->
  match '', 'home#index'
  match 'add', 'add#index'
  match 'graph', 'graph#index'

# module.exports = (match) ->

#   match 'livegamestats/playbyplay', 'play-by-play#index'
#   match 'livegamestats/team', 'team#index'
#   match 'livegamestats/players', 'players#index'
#   match 'livegamestats/headtohead', 'head-to-head#index'
#   match 'standings/conference', 'standings#conference'
#   match 'standings/division', 'standings#division'
#   match 'standings/expanded', 'standings#expanded'
#   match 'teamstats/season', 'team-stats#index'
#   match 'teamstats/leaders', 'team-stats#leaders'

  # ===
  # TODO: 404/wildcard redirect controller?
  # match '*anything', '404#index'
