import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import { arrayToOptions, getColumns, gameweekOptions, formikValuesToParams } from '../helpers/helpers';
import { sendRequest } from '../helpers/helpers';
import { teamsStyle } from '../helpers/constants';
import Table from './shared/Table';
import AppFormik from './shared/AppFormik';

function TeamStats({ gameweekRange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const comparators = data?.comparators ? arrayToOptions(data.comparators) : [];
  const begin = parseInt(searchParams.get('begin')) || data?.begin || 0;
  const end = parseInt(searchParams.get('end')) || data?.end || 0;
  const currentGameweek = data?.currentGameweek;

  useEffect(() => {
    setIsLoading(true);
    sendRequest(`/${gameweekRange ? 'gameweek' : 'season'}/teams`, {
      sort: searchParams.get('sort'),
      ...(gameweekRange && {
        begin: searchParams.get('begin'),
        end: searchParams.get('end')
      })
    }).then(data => setData(data)).finally(() => setIsLoading(false));
  }, [searchParams, gameweekRange]);

  useEffect(() => {
    if (data && !columns.length) setColumns(getColumns(Object.keys(data.stats[0])))
    // eslint-disable-next-line
  }, [data]);

  const options = useMemo(() => (
    currentGameweek ? gameweekOptions(1, currentGameweek) : []
  ), [currentGameweek]);

  const formikChildren = ['sort',
    ...gameweekRange ? ['begin', 'end'] : []
  ];

  const optionsMap = {
    sort: comparators,
    ...(gameweekRange && {
      begin: options,
      end: options,
    })
  };

  const onSubmit = (values) => {
    setSearchParams(formikValuesToParams(values))
  };

  const initialValues = {
    sort: comparators.find(o => o.value === (searchParams.get('sort') || 'xG')),
    ...(gameweekRange && {
      begin: options.find(o => o.value === begin),
      end: options.find(o => o.value === end)
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
        style={teamsStyle}
        rows={data?.stats}
        columns={columns}
        getCellClassName={(params) => {
          if (params.field === 'expected_goals_conceded')
            return 'xGC'
          if (params.field === 'expected_goals')
            return 'xG'

          return null;
        }}
      />
    </Box>
  )
}

export default TeamStats;
