import { ActionIcon, Button, Container, NumberInput, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Cell, CellProps, Column } from 'react-table';
import { showNotification } from "@mantine/notifications";
import { Box, Flex } from '../components';
import { EditField } from '../components/Home/EditField';
import { AddField } from '../components/Home/AddField';
import { exportToCSV } from '../components/Home/exportToCSV';
import { TablePreviewer } from '../components/TablePreviewer';
import useStyles from "../components/Home/index.styles";
import { normalizeString } from '../components/helper';

export interface iField {
  label: string;
  name: string;
  contains: string;
  Cell?: Cell;
}

const Home: NextPage = () => {
  const [limit, setLimit] = useState<any>(100);
  const [maxView, setMaxView] = useState<any>(100);
  const [data, setData] = useState<any>(null);
  const { classes } = useStyles();
  const [fields, setFields] = useState<iField[]>([{
    label: "Name",
    name: "name",
    contains: "name"
  }, {
    label: "Address",
    name: "address",
    contains: "streetAddress"
  }, {
    label: "Phone",
    name: "phone",
    contains: "phoneNumber"
  }, {
    label: "Job",
    name: "job",
    contains: "jobType"
  }]);

  const columns = useMemo<Column[]>(() => {
    return [
      {
        Header: "",
        accessor: "first_action_button",
        width: 40,
        Cell: () => (
          <div className="action">
            <ActionIcon>
              <IconChevronDown
                size={16}
                onClick={() => { }}
              />
            </ActionIcon>
          </div>
        )
      },
      ...fields.map(({ label, name, contains }, index) => ({
        Header: () => (
          <Flex className={classes.header} align="center">
            <Box grow>
              {label}
            </Box>
            <div className='action'>
              <EditField
                value={{ label, contains }}
                onClose={(value, touched) => {
                  if (!touched) return;
                  setFields(f => {
                    f[index].label = value.label;
                    f[index].contains = value.contains;
                    return [...f];
                  })
                }}
                onDelete={() => {
                  setFields(f => {
                    return f.filter((_, i) => i !== index);
                  })
                }}
              />
            </div>
          </Flex>
        ),
        accessor: name,
        Cell: ({ value }: CellProps<{}>) => {
          return (
            <Text sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} title={value}>
              {value}
            </Text>
          )
        }
      })),
      {
        accessor: "last_action_button",
        Header: () => (
          <>
            <AddField
              onAdd={(value) => {
                setFields(f => {
                  return [
                    ...f,
                    {
                      name: `${f.length + 1}-${normalizeString(value.label)}`,
                      label: value.label,
                      contains: value.contains,
                    }
                  ];
                })
              }}
            />
          </>
        ),
        Cell: () => ""
      },
    ]
  }, [fields, classes]);

  const onExport = useCallback(() => {
    exportToCSV({
      fields,
      data
    });
    showNotification({
      message: "Data exported"
    })
  }, [data, fields]);

  useEffect(() => {
    const pull = async () => {
      if (!limit) return;
      try {
        const url = new URL(`${window.location.href}api/generate`);
        const params = fields?.map(({ contains, name }) => [name, contains])
        params.push(["limit", limit]);
        url.search = new URLSearchParams(params).toString();
        const res = await (await fetch(url.toString(), {
          method: "GET",
        })).json();
        setData(res);
      } catch (err) {
        console.error(err);
      }
    }
    pull();
  }, [fields, limit]);

  return (
    <Flex
      direction={"column"}
      sx={{
        position: "fixed",
        inset: 0
      }}>
      <Head>
        <title>palsu</title>
        <meta name="description" content="Fake online data generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Container>
          <Flex align={"center"} py="xs">
            <Box grow>
              <Text>PALSU</Text>
            </Box>
            <Box>
              <Button
                onClick={() => onExport()}
              >
                Export to CSV
              </Button>
            </Box>
          </Flex>
        </Container>
      </header>

      <Box pb="sm" >
        <Container>
          <Flex>
            <Box mr="sm">
              <Text component="label">Rows</Text>
              <NumberInput
                type="number"
                value={limit}
                max={1000}
                onChange={(value: number) => {
                  if (value > 1000) value = 1000;
                  setLimit(value || undefined);
                }}
              />
            </Box>
            <Box>
              <Text component="label">Max View Row</Text>
              <NumberInput
                type="number"
                value={maxView}
                max={1000}
                onChange={(value: number) => {
                  if (value > 1000) value = 1000;
                  setMaxView(value || undefined);
                }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box grow>
        <TablePreviewer
          limit={maxView}
          columns={columns}
          data={data || []}
        />
      </Box>
    </Flex>
  )
}

export default Home;
