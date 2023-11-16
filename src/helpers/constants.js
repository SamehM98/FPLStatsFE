export const labels = {
  expected_goals: 'xG',
  expected_goals_conceded: 'xGC',
  name: 'Team',
  web_name: 'Name',
  selected_by_percent: 'Selection %',
  total_points: 'Points',
  minutes: 'Minutes',
  starts: 'Starts',
  bonus: 'Bonus',
  goals_scored: 'Goals',
  assists: 'Assists',
  now_cost: 'Cost',
  team: 'Team',
  expected_assists: 'xA',
  expected_goal_involvements: 'xGI',
  expected_goals_per_90: 'xGper90',
  expected_assists_per_90: 'xAper90',
  expected_goal_involvements_per_90: 'xGIper90',
  goals_conceded: 'Goals conceded',
  expected_goals_conceded_per_90: 'xGCper90',
  clean_sheets: 'Clean sheets',
  saves_per_90: 'Saves per 90',
  saves: 'Saves'
}

export const formikStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '75%',
  paddingBottom: '16px'
};

export const fixturesStyle = {
  fontWeight: 550,
  '.easy': {
    backgroundColor: '#3cb371',
  },
  '.mid': {
    backgroundColor: '#f8a605',
  },
  '.hard': {
    backgroundColor: '#ff0000',
  },
  '.blank': {
    backgroundColor: '#A0A0A0',
  },
  '.header': {
    fontSize: '1.0rem'
  },
};

export const statsStyle = {
  fontWeight: 550,
  '.header': {
    fontSize: '1.0rem'
  },
  '.green': {
    backgroundColor: '#08DA08',
  },
  '.red': {
    backgroundColor: '#ED3E3E',
  },
  '.yellow': {
    backgroundColor: '#FFFF00',
  }
};

export const statsClasses = {
  expected_goals: 'green',
  expected_goals_conceded: 'red',
  selected_by_percent: 'yellow',
  total_points: 'yellow',
  minutes: 'yellow',
  starts: 'yellow',
  bonus: 'yellow',
  now_cost: 'yellow',
  team: 'yellow',
  goals_scored: 'green',
  assists: 'green',
  expected_assists: 'green',
  expected_goal_involvements: 'green',
  expected_goals_per_90: 'green',
  expected_assists_per_90: 'green',
  expected_goal_involvements_per_90: 'green',
  goals_conceded: 'red',
  expected_goals_conceded_per_90: 'red',
  clean_sheets: 'green',
  saves_per_90: 'green',
  saves: 'green'
}

export const positions = [
  {
    id: 1,
    path: 'goalkeepers'
  },
  {
    id: 2,
    path: 'defenders'
  },
  {
    id: 3,
    path: 'midfielders'
  },
  {
    id: 4,
    path: 'forwards'
  }
]
