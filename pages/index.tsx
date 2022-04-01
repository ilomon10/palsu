import { PlusIcon, TrashIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Cell, Column } from 'react-table';
import { Box, Button, Container, Flex, IconButton, Select, Text, TextField } from '../components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuRightSlot,
  DropdownMenuSeparator
} from '../components/Dropdown';
import { EditField } from '../components/Home/EditField';
import { exportToCSV } from '../components/Home/exportToCSV';

import { TablePreviewer } from '../components/TablePreviewer';
import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '../components/Toast';

export interface iField {
  label: string;
  name: string;
  contains: string;
  Cell?: Cell;
}

const Home: NextPage = () => {
  const [toast, setToast] = useState<any>(false);
  const [limit, setLimit] = useState<any>(100);
  const [maxView, setMaxView] = useState<any>(100);
  const [data, setData] = useState<any>(null);
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
        Cell: ({ cell }) => (
          <div className="action">
            <IconButton>
              <TriangleDownIcon
                onClick={() => { }}
              />
            </IconButton>
          </div>
        )
      },
      ...fields.map(({ label, name, contains }, index) => ({
        Header: () => (
          <Flex align="center">
            <Box grow={1}>
              {label}
            </Box>
            <Box css={{ ml: "$2" }}>
              <EditField
                value={{ label, contains }}
                onChange={(value) => {
                  setFields(f => {
                    f[index].label = value.label;
                    f[index].contains = value.contains;
                    console.log(f);
                    return [...f];
                  })
                }}
                onDelete={() => {
                  setFields(f => {
                    return f.filter((_, i) => i !== index);
                  })
                }}
              />
            </Box>
          </Flex>
        ),
        accessor: name,
      })),
      {
        accessor: "last_action_button",
        Header: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
              <IconButton css={{ mr: "$3" }}>
                <PlusIcon
                  onClick={() => console.log("Add")}
                />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>New Field Type</DropdownMenuLabel>
                {[
                  { label: "Name", value: "name" },
                  { label: "Address", value: "address" },
                  { label: "Phone", value: "phone" },
                  { label: "Job", value: "jobType" },
                ].map(({ label, value }) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => {
                      setFields(f => {
                        return [
                          ...f,
                          {
                            name: `${value}-${f.length + 1}`,
                            label: `New Field ${label}`,
                            contains: value
                          }
                        ]
                      })
                    }}>{label}</DropdownMenuItem>
                ))}
                <DropdownMenuItem>Custom <DropdownMenuRightSlot>Not available yet</DropdownMenuRightSlot></DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        Cell: ({ cell }) => ""
      },
    ]
  }, [fields]);

  const onExport = useCallback(() => {
    exportToCSV({
      fields,
      data
    });
    setToast(true);
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
        console.log(res[0]);
      } catch (err) {
        console.error(err);
      }
    }
    pull();
  }, [fields, limit]);

  return (
    <Flex
      direction={"column"}
      css={{
        position: "fixed",
        inset: 0
      }}>
      <Head>
        <title>palsu</title>
        <meta name="description" content="Fake online data generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Container size="2">
          <Flex align={"center"} css={{ py: "$2" }}>
            <Box grow={"1"}>
              <Text>PALSU</Text>
            </Box>
            <Box>
              <Button
                onClick={() => onExport()}
              >
                Export to CSV
              </Button>

              <Toast open={toast} onOpenChange={setToast}>
                <ToastTitle>Data Exported</ToastTitle>
                <ToastAction asChild altText="Goto schedule to undo">
                  <Button variant="green" size="1">
                    OK
                  </Button>
                </ToastAction>
              </Toast>
            </Box>
          </Flex>
        </Container>
      </header>

      <section>
        <Container size={"2"}>
          <Flex css={{ mb: "$4" }}>
            <Box css={{ mr: "$3" }}>
              <Text as="label" css={{ mb: "$1" }}>Rows</Text>
              <TextField
                type="number"
                value={limit}
                max={1000}
                onChange={(e) => {
                  let value = (e.target.value);

                  if (parseInt(value) > 1000) {
                    value = "1000";
                  }

                  setLimit(value || undefined);
                }}
                css={{
                  maxWidth: 75
                }}
              />
            </Box>
            <Box>
              <Text as="label" css={{ mb: "$1" }}>Max View Row</Text>
              <TextField
                type="number"
                value={maxView}
                max={1000}
                onChange={(e) => {
                  let value = (e.target.value);

                  if (parseInt(value) > 1000) {
                    value = "1000";
                  }

                  setMaxView(value || undefined);
                }}
                css={{
                  maxWidth: 75
                }}
              />
            </Box>
          </Flex>
        </Container>
      </section>

      <Flex
        as="main"
        direction={"column"}
        grow={1}
        css={{
          position: "relative",
          overflow: "auto"
        }}
      >
        <TablePreviewer
          limit={maxView}
          columns={columns}
          data={data || []}
        />
      </Flex>
    </Flex>
  )
}

export default Home;
