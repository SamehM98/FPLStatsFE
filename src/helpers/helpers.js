import apiClient from "../client/apiClient";
import { labels } from "./constants";

export const sendRequest = async (path, params) => {
  const { data } = await apiClient.get(path, { params });
  return data;
};

export const fixtureObject = (fixtures) => {
  let difficulty = 0;
  let text = 'Blank';
  for (let i = 0; i < fixtures.length; i++) {
    if (i === 0) {
      difficulty = fixtures[i].difficulty;
      text = `${fixtures[i].opponent}${fixtures[i].home ? '(H)' : '(A)'}`
    }
    else {
      difficulty = (difficulty + fixtures[i].difficulty) / (i + 1);
      text += `  ,  ${fixtures[i].opponent}${fixtures[i].home ? '(H)' : '(A)'}`;
    }
  }

  return { difficulty, text }
};

export const getColumns = (keys) => (
  keys.filter(key => key in labels).map(key => (
    {
      field: key,
      headerName: labels[key],
      minWidth: 75,
      flex: 1,
      sortable: false,
      headerAlign: 'center',
      headerClassName: 'header',
    }
  ))
);

export const arrayToOptions = (arr) => (
  arr.map(a => (
    { value: a, label: a }
  ))
);


export const formikValuesToParams = (values) => {
  const params = {};
  Object.keys(values).forEach(v => {
    if (values[v])
      params[v] = values[v].value;
  });

  return params;
};

export const gameweekOptions = (begin, end) => {
  const options = [];
  for (let i = begin; i <= end; i++) {
    options.push({ value: i, label: `Gameweek ${i}` });
  }

  return options;
}
