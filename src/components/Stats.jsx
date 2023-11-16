import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import { arrayToOptions, getColumns, gameweekOptions, formikValuesToParams, teamOptions } from '../helpers/helpers';
import { sendRequest } from '../helpers/helpers';
import { labels, style } from '../helpers/constants';
import Table from './shared/Table';
import AppFormik from './shared/AppFormik';

function Stats({ gameweekRange, position, playerStats }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const comparators = data?.comparators ? arrayToOptions(data.comparators) : [];
  const begin = parseInt(searchParams.get('begin')) || data?.begin || 0;
  const end = parseInt(searchParams.get('end')) || data?.end || 0;
  const currentGameweek = data?.currentGameweek;
  const teams = data?.teams ? teamOptions(data.teams) : [];
  console.log(teams)

  useEffect(() => {
    const getTeamStats = () => {
      sendRequest(`/${gameweekRange ? 'gameweek' : 'season'}/teams`, {
        sort: searchParams.get('sort'),
        ...(gameweekRange && {
          begin: searchParams.get('begin'),
          end: searchParams.get('end')
        })
      }).then(data => setData(data)).finally(() => setIsLoading(false));
    };

    const getPlayerStats = () => {
      sendRequest(`/${gameweekRange ? 'gameweek' : 'season'}/players`, {
        sort: searchParams.get('sort'),
        position,
        team: searchParams.get('team'),
        ...(gameweekRange && {
          begin: searchParams.get('begin'),
          end: searchParams.get('end')
        })
      }).then(data => setData(data)).finally(() => setIsLoading(false));
    };

    setIsLoading(true);
    playerStats ? getPlayerStats() : getTeamStats();
    // eslint-disable-next-line
  }, [searchParams, gameweekRange, position]);

  useEffect(() => {
    if (data && !columns.length) setColumns(getColumns(Object.keys(data.stats[0]), teams))
    // eslint-disable-next-line
  }, [data]);

  const options = useMemo(() => (
    (currentGameweek && gameweekRange) ? gameweekOptions(1, currentGameweek) : []
  ), [currentGameweek, gameweekRange]);

  const formikChildren = ['sort',
    ...gameweekRange ? ['begin', 'end'] : [],
    ...playerStats ? ['team'] : [],
  ];

  const optionsMap = {
    sort: comparators,
    begin: options,
    end: options,
    team: teams,
  };

  const onSubmit = (values) => {
    setSearchParams(formikValuesToParams(values))
  };

  const initialValues = {
    sort: comparators.find(o => o.value === (searchParams.get('sort'))),
    ...(gameweekRange && {
      begin: options.find(o => o.value === begin),
      end: options.find(o => o.value === end)
    }),
    ...(playerStats && {
      team: teams.find(o => o.value === parseInt(searchParams.get('team'))),
    })
  }

  if (isLoading) return <Spinner />

  return (
    <Box padding={5}>
      <AppFormik
        initialValues={initialValues}
        onSubmit={onSubmit}
        optionsMap={optionsMap}
        text="Get Data"
        formikChildren={formikChildren}
      />
      <Table
        style={style}
        rows={data?.stats}
        columns={columns}
        pageSize={10}
        getCellClassName={(params) => labels[params.field].class}
      />
    </Box>
  )
}

export default Stats;
