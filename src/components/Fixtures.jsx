import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import apiClient from '../client/apiClient';
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material';
import Select from 'react-select';
import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import Spinner from './Spinner';

function Fixtures() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentGameweek = data?.currentGameweek;
  const begin = parseInt(searchParams.get('begin')) || (data ? data.begin : 0);
  const end = parseInt(searchParams.get('end')) || (data ? data.end : 0);

  useEffect(() => {
    setIsLoading(true);
    apiClient.get('/fixtures', {
      params: {
        begin: searchParams.get('begin') || 0,
        end: searchParams.get('end') || 0
      }
    }).then(({ data }) => {
      setData(data);
    })
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const fixtureObject = (fixtures) => {
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

  const options = useMemo(() => {
    const selectOptions = [];
    if (!currentGameweek) return selectOptions;

    for (let i = currentGameweek; i <= 38; i++) {
      selectOptions.push({ value: i, label: `Gameweek ${i}` });
    }

    return selectOptions;
  }, [currentGameweek]);

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

  const formikInitialValues = { begin: options.find(o => o.value === begin), end: options.find(o => o.value === end) };
  const formikChildren = ['begin', 'end'];

  const onSubmit = (values) => {
    setSearchParams({
      begin: values.begin.value,
      end: values.end.value,
    })
  }

  if (isLoading) return <Spinner />

  return (
    <Box padding={5}>
      <Formik initialValues={formikInitialValues} enableReinitialize id="myForm" onSubmit={onSubmit}>
        {({ values, setFieldValue, handleSubmit }) =>
          <Form onSubmit={handleSubmit}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '60%',
              paddingBottom: '16px'
            }}>
              {formikChildren.map((child) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px', textTransform: 'capitalize' }}>{child}</span>
                  <Select
                    options={options}
                    value={values[child]}
                    name={child}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        width: '200px',
                      }),
                    }}
                    onChange={(v) => setFieldValue(child, v)}
                  />
                </div>
              ))}
              <Button variant="outlined" type="submit">Get Fixtures</Button>
            </div>
          </Form>}
      </Formik>
      <DataGrid
        disableColumnFilter
        disableColumnMenu
        pageSizeOptions={[]}
        disableColumnSelector
        rows={rows || []}
        sx={
          {
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
          }
        }
        columns={columns}
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
