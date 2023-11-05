import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';
import { sendRequest, fixtureObject, formikValuesToParams, gameweekOptions } from '../helpers/helpers';
import { fixturesStyle } from '../helpers/constants';
import Table from './shared/Table';
import AppFormik from './shared/AppFormik';

function Fixtures() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentGameweek = data?.currentGameweek;
  const begin = parseInt(searchParams.get('begin')) || (data ? data.begin : 0);
  const end = parseInt(searchParams.get('end')) || (data ? data.end : 0);

  useEffect(() => {
    setIsLoading(true);
    sendRequest('/fixtures', {
      begin: searchParams.get('begin'),
      end: searchParams.get('end')
    }).then(data => setData(data)).finally(() => setIsLoading(false));
  }, [searchParams]);

  const rows = useMemo(() => (
    data?.stats.map(team => {
      const row = { id: team.id, name: team.name };
      for (let i = begin; i <= end; i++) {
        const filteredArray = team.fixtures.filter((f) => f.gameweek === i);
        row[`gw_${i}`] = fixtureObject(filteredArray);
      }
      return row;
    })
  ), [begin, end, data]);

  const options = useMemo(() => (
    currentGameweek ? gameweekOptions(currentGameweek, 38) : []
  ), [currentGameweek]);

  const columns = useMemo(() => {
    if (!begin || !end) return [];
    const col = [
      {
        field: 'name', headerName: 'Team', sortable: false, minWidth: 200,
        headerAlign: 'center',
        headerClassName: 'header',
      },
    ];

    for (let i = begin; i <= end; i++) {
      col.push({
        field: `gw_${i}`,
        headerName: `Gameweek ${i}`,
        minWidth: 150,
        flex: 1,
        sortable: false,
        headerAlign: 'center',
        valueGetter: ((v) => v.value.text),
        headerClassName: 'header',
      })
    }

    return col;
  }, [begin, end]);

  const initialValues = { begin: options.find(o => o.value === begin), end: options.find(o => o.value === end) };
  const formikChildren = ['begin', 'end'];
  const optionsMap = {
    begin: options,
    end: options,
  }
  const onSubmit = (values) => {
    setSearchParams(formikValuesToParams(values))
  }

  if (isLoading) return <Spinner />

  return (
    <Box padding={5}>
      <AppFormik initialValues={initialValues}
        text="Get Fixtures"
        onSubmit={onSubmit}
        optionsMap={optionsMap}
        formikChildren={formikChildren}
      />
      <Table
        rows={rows}
        columns={columns}
        style={fixturesStyle}
        getCellClassName={(params) => {
          if (params.field === 'name')
            return null;
          if (params.row[params.field]['difficulty'] >= 4)
            return 'hard';
          else if (params.row[params.field]['difficulty'] === 3)
            return 'mid';
          return (params.row[params.field]['difficulty'] === 0) ? 'blank' : 'easy';
        }}
      />
    </Box>
  )
};

export default Fixtures;
