import React from 'react';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import { arrayToOptions, getColumns } from '../helpers/helpers';
import { sendRequest } from '../helpers/helpers';
import { teamsStyle } from '../helpers/constants';
import Table from './shared/Table';
import AppFormik from './shared/AppFormik';

function TeamSeason() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const comparators = data?.comparators ? arrayToOptions(data.comparators) : [];

  useEffect(() => {
    setIsLoading(true);
    sendRequest('/season/teams', {
      sort: searchParams.get('sort')
    }).then(data => setData(data)).finally(() => setIsLoading(false));
  }, [searchParams]);

  useEffect(() => {
    if (data && !columns.length) setColumns(getColumns(Object.keys(data.stats[0])))
    // eslint-disable-next-line
  }, [data]);

  const formikChildren = ['sort'];
  const optionsMap = {
    sort: comparators,
  };
  const onSubmit = (values) => {
    setSearchParams({
      sort: values.sort.value,
    })
  };
  const initialValues = {
    sort: comparators.find(o => o.value === (searchParams.get('sort') || 'xG'))
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

export default TeamSeason;
