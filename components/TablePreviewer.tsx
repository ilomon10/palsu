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
    if(!limit) temp;
    return temp.splice(0, limit);
  }, [limit, data.length]);
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
        {headerGroups.map(headerGroup => (
          <Box
            as="tr"
            css={{
              textAlign: "left",
              $$shadowColor: "$colors-slate4",
              boxShadow: "0 2px 0 $$shadowColor, 0 -1px 0 $$shadowColor",
            }}
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <Box as={"th"}
                css={{
                  py: "$1",
                  px: "$1",
                  whiteSpace: "nowrap",
                  $$shadowColor: "$colors-slate4",
                  boxShadow: "1px 0 0 $$shadowColor",
                }}
                {...column.getHeaderProps()}>
                {column.render("Header")}
              </Box>
            ))}
          </Box>
        ))}
      </thead>
      <tbody  {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Box
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
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => (
                <Box
                  as="td"
                  css={{
                    p: "$1",
                    whiteSpace: "nowrap",
                    $$shadowColor: "$colors-slate4",
                    boxShadow: "1px 0 0 $$shadowColor"
                  }}
                  {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </Box>
              ))}
            </Box>
          )
        })}
      </tbody>
    </Box >
  )
}