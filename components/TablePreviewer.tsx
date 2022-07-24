import { Box } from "./Box";
import { Column, useBlockLayout, useTable } from "react-table";
import { FixedSizeList } from "react-window";
import { useCallback, useMemo } from "react";
import useScrollbarSize from "react-scrollbar-size";
import useStyles from "./TablePreviewer.styles";
import { useElementSize } from "usehooks-ts";

interface props {
  columns: Column[];
  data: any[];
  limit?: number;
}

export const TablePreviewer: React.FC<props> = ({
  columns,
  data,
  limit = 50,
}) => {
  const { classes } = useStyles();
  const additionalRow = (data.length - limit) || 0;

  const [tbodyRef, { height }] = useElementSize();

  const defaultColumn = useMemo(() => ({ width: 200 }), []);

  const items = useMemo(() => {
    let temp = [...data];
    if (!limit) temp;
    temp = temp.splice(0, limit);
    return temp;
  }, [limit, data]); //  eslint-disable-next-line react-hooks/exhaustive-deps

  const scrollbar = useScrollbarSize();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = useTable(
    {
      columns,
      data: items,
      defaultColumn,
    },
    useBlockLayout
  );

  const RenderRows = useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      const { key, ...rowProps } = row.getRowProps({ style });

      let overlay: boolean = false;
      if (index >= rows.length - 1) {
        overlay = true;
      }

      return (
        <Box key={key} className={classes.tr} {...rowProps}>
          {/* <Box className={classes.thinLine} /> */}
          {overlay && <Box className={classes.rowOverlay}>+{additionalRow} more row</Box>}
          {row.cells.map((cell) => {
            const { key, ...cellProps } = cell.getCellProps();
            return (
              <Box key={key} className={classes.td} p={"xs"} {...cellProps}>
                {cell.render("Cell")}
              </Box>
            );
          })}
        </Box>
      );
    },
    [prepareRow, rows, classes]
  );

  return (
    <Box className={classes.root} {...getTableProps()}>
      <div className={classes.thead}>
        <Box className={classes.thinLine} />
        {headerGroups.map((headerGroup) => {
          const { key, ...headerGroupProps } =
            headerGroup.getHeaderGroupProps();
          return (
            <Box
              key={key}
              className={classes.headerGroup}
              {...headerGroupProps}
            >
              {headerGroup.headers.map((column) => {
                const { key, ...headerProps } = column.getHeaderProps();
                return (
                  <Box
                    key={key}
                    p={"xs"}
                    className={classes.headerColumn}
                    {...headerProps}
                  >
                    {/* <Text> */}
                    {column.render("Header")}
                    {/* </Text> */}
                  </Box>
                );
              })}
            </Box>
          );
        })}
        <Box className={classes.thinLine} />
      </div>
      <div className={classes.tbody} ref={tbodyRef} {...getTableBodyProps()}>
        <FixedSizeList
          height={height}
          itemCount={rows.length}
          itemSize={40}
          width={totalColumnsWidth + scrollbar.width}
        >
          {RenderRows}
        </FixedSizeList>
      </div>
    </Box>
  );
};
