export const labels = {
  expected_goals: {
    label: 'xG',
    class: 'green'
  },
  expected_goals_conceded: {
    label: 'xGC',
    class: 'red',
  },
  name: {
    label: 'Team',
    class: null,
  },
  web_name: {
    label: 'Name',
    class: null,
  },
  selected_by_percent: {
    label: 'Selection %',
    class: 'yellow'
  },
  total_points: {
    label: 'Points',
    class: 'yellow'
  },
  minutes: {
    label: 'Minutes',
    class: 'yellow'
  },
  starts: {
    label: 'Starts',
    class: 'yellow'
  },
  bonus: {
    label: 'Bonus',
    class: 'yellow'
  },
  goals_scored: {
    label: 'Goals',
    class: 'green'
  },
  assists: {
    label: 'Assists',
    class: 'green'
  },
  now_cost: {
    label: 'Cost',
    class: 'yellow'
  },
  team: {
    label: 'Team',
    class: 'yellow'
  },
  expected_assists: {
    label: 'xA',
    class: 'green'
  },
  expected_goal_involvements: {
    label: 'xGI',
    class: 'green'
  },
  expected_goals_per_90: {
    label: 'xGper90',
    class: 'green'
  },
  expected_assists_per_90: {
    label: 'xAper90',
    class: 'green'
  },
  expected_goal_involvements_per_90: {
    label: 'xGIper90',
    class: 'green'
  },
  goals_conceded: {
    label: 'Goals conceded',
    class: 'red'
  },
  expected_goals_conceded_per_90: {
    label: 'xGCper90',
    class: 'red'
  },
  clean_sheets: {
    label: 'Clean sheets',
    class: 'green'
  },
  saves_per_90: {
    label: 'Saves per 90',
    class: 'green'
  },
  saves: {
    label: 'Saves',
    class: 'green'
  }
}

export const formikStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '90%',
  paddingBottom: '16px'
};

export const style = {
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
  },
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
};

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
