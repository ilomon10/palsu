import {
  ActionIcon,
  Container,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { IconChevronDown, IconClipboard } from "@tabler/icons";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Cell, CellProps, Column } from "react-table";
import { showNotification } from "@mantine/notifications";
import { Box, Flex } from "../components";
import { EditField } from "../components/Home/EditField";
import { AddField } from "../components/Home/AddField";
import { exportToCSV } from "../components/Home/exportToCSV";
import { TablePreviewer } from "../components/TablePreviewer";
import useStyles from "../components/Home/index.styles";
import { normalizeString, stringToASCII } from "../components/helper";
import { Header } from "../components/Home/Header";
import { useClient } from "../components/client";
import { useRouter } from "next/router";
import { useDebounce } from "usehooks-ts";
import { FilterForm } from "../components/Home/FilterForm";
import { ButtonIcon } from "@radix-ui/react-icons";
import { GeneratedUrlInput } from "../components/Home/GeneratedUrlInput";

export interface iField {
  label: string;
  name: string;
  contains: string;
  Cell?: Cell;
}

const Home: NextPage = (a, b) => {
  const router = useRouter();
  const [filter, setFilter] = useState<{
    limit: number | undefined;
    seed: string;
  }>({
    seed: (router.query.seed as string) || "palsu",
    limit: 100,
  });
  const [maxView, setMaxView] = useState<any>(50);
  const [data, setData] = useState<any>(null);
  const client = useClient();
  const { classes } = useStyles();

  const tempFilter = useDebounce(filter, 200);

  const [fields, setFields] = useState<iField[]>([
    {
      label: "Name",
      name: "name",
      contains: "name",
    },
    {
      label: "Address",
      name: "address",
      contains: "streetAddress",
    },
    {
      label: "Phone",
      name: "phone",
      contains: "phoneNumber",
    },
    {
      label: "Job",
      name: "job",
      contains: "jobType",
    },
  ]);

  const columns = useMemo<Column[]>(() => {
    return [
      {
        Header: "",
        accessor: "first_action_button",
        width: 40,
        Cell: () => (
          <div className="action">
            <ActionIcon>
              <IconChevronDown size={16} onClick={() => {}} />
            </ActionIcon>
          </div>
        ),
      },
      ...fields.map(({ label, name, contains }, index) => ({
        Header: () => (
          <Flex className={classes.header} align="center">
            <Box grow>{label}</Box>
            <div className="action">
              <EditField
                value={{ label, contains }}
                onClose={(value, touched) => {
                  if (!touched) return;
                  setFields((f) => {
                    f[index].label = value.label;
                    f[index].contains = value.contains;
                    return [...f];
                  });
                }}
                onDelete={() => {
                  setFields((f) => {
                    return f.filter((_, i) => i !== index);
                  });
                }}
              />
            </div>
          </Flex>
        ),
        accessor: name,
        Cell: ({ value }: CellProps<{}>) => {
          return (
            <Text
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
              title={value}
            >
              {value}
            </Text>
          );
        },
      })),
      {
        accessor: "last_action_button",
        Header: () => (
          <>
            <AddField
              onAdd={(value) => {
                setFields((f) => {
                  return [
                    ...f,
                    {
                      name: `${f.length + 1}-${normalizeString(value.label)}`,
                      label: value.label,
                      contains: value.contains,
                    },
                  ];
                });
              }}
            />
          </>
        ),
        Cell: () => "",
      },
    ];
  }, [fields, classes]);

  const onExport = useCallback(() => {
    exportToCSV({
      fields,
      data,
    });
    showNotification({
      message: "Data exported",
    });
  }, [data, fields]);

  useEffect(() => {
    const { limit, seed } = filter;
    const pull = async () => {
      if (!limit) return;
      try {
        const res = await client.get(fields, limit, seed);
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };
    pull();
  }, [fields, filter]);

  useEffect(() => {
    if (tempFilter === undefined) return;
    const { limit, seed } = tempFilter;
    router.push({ query: { seed, limit } }, undefined, { shallow: true });
  }, [tempFilter]);

  return (
    <Flex
      direction={"column"}
      sx={{
        position: "fixed",
        inset: 0,
      }}
    >
      <Head>
        <title>palsu</title>
        <meta
          name="description"
          content="The fake online data generator is a tool that generates fake data for your testing application without setting up any server. You only need to enter some parameters and click generate button. After that, you can use the generated fake data in your testing application."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Header />
      </header>

      <Box pb="sm">
        <Container>
          <FilterForm
            values={{
              limit: Number(filter.limit) || undefined,
              seed: filter.seed,
            }}
            onSubmit={function (values): void {
              setFilter(values);
            }}
          />
          <Box mt={"sm"}>
            <GeneratedUrlInput
              fields={fields}
              limit={tempFilter.limit}
              seed={tempFilter.seed}
            />
          </Box>
        </Container>
      </Box>

      <Box grow>
        <TablePreviewer limit={maxView} columns={columns} data={data || []} />
      </Box>
    </Flex>
  );
};

export default Home;
