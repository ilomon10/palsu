import { Box } from "./Box"
import { Column, useTable } from "react-table"
import { useMemo } from "react";

interface props {
  columns: Column[];
  data: any[];
  limit?: number;
}

export const TablePreviewer: React.FC<props> = ({
  columns,
  data,
  limit = 100
}) => {
  const items = useMemo(() => {
    let temp = [...data];
    if (!limit) temp;
    return temp.splice(0, limit);
  }, [limit, data.length]); //  eslint-disable-next-line react-hooks/exhaustive-deps
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: items,
  });
  return (
    <Box
      as="table"
      css={{
        borderCollapse: "collapse",
        boxSizing: "border-box",
        mt: 1
      }}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map(headerGroup => {
          const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
          return (
            <Box
              key={key}
              as="tr"
              css={{
                textAlign: "left",
                $$shadowColor: "$colors-slate4",
                boxShadow: "0 2px 0 $$shadowColor, 0 -1px 0 $$shadowColor",
              }}
              {...headerGroupProps}
            >
              {headerGroup.headers.map((column) => {
                const { key, ...headerProps } = column.getHeaderProps();
                return (
                  <Box
                    key={key}
                    as={"th"}
                    css={{
                      py: "$1",
                      px: "$1",
                      whiteSpace: "nowrap",
                      $$shadowColor: "$colors-slate4",
                      boxShadow: "1px 0 0 $$shadowColor",
                    }}
                    {...headerProps}>
                    {column.render("Header")}
                  </Box>
                )
              })}
            </Box>
          )
        })}
      </thead>
      <tbody  {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...rowProps } = row.getRowProps();
          return (
            <Box
              key={key}
              as="tr"
              css={{
                $$shadowColor: "$colors-slate4",
                boxShadow: "0 1px 0 $$shadowColor",
                ".action": {
                  opacity: 0
                },
                "&:hover": {
                  backgroundColor: "$slate3",
                  ".action": {
                    opacity: 1
                  }
                }
              }}
              {...rowProps}
            >
              {row.cells.map((cell) => {
                const { key, ...cellProps } = cell.getCellProps();
                return (
                  <Box
                    key={key}
                    as="td"
                    css={{
                      p: "$1",
                      whiteSpace: "nowrap",
                      $$shadowColor: "$colors-slate4",
                      boxShadow: "1px 0 0 $$shadowColor"
                    }}
                    {...cellProps}>
                    {cell.render("Cell")}
                  </Box>
                )
              })}
            </Box>
          )
        })}
      </tbody>
    </Box >
  )
}