import { createStyles } from "@mantine/core";

export default createStyles(({ colors }) => ({
  root: {
    // position: "relative",
    height: "100%",
    borderCollapse: "collapse",
    boxSizing: "border-box",
    width: "100%",
    overflowX: "auto"
  },
  thead: {
  },
  headerGroup: {
    // position: "relative",
    minWidth: "100%",
    height: 40,
    textAlign: "left",
  },
  headerColumn: {
    // position: "relative",
    whiteSpace: "nowrap",
    boxShadow: `-1px 0px 0px 0px ${colors.gray[2]}`,
    flexShrink: 0,
  },
  tbody: {
    height: "calc(100% - 40px)",
    "& > div": {
      minWidth: "100%",
      // "& > div": {
      //   paddingTop: 40,
      // }
    }
  },
  tr: {
    width: "100% !important",
    boxShadow: `0 1px 0 ${colors.gray[2]}`,
    ".action": {
      opacity: 0
    },
    "&:hover": {
      backgroundColor: colors.gray[1],
      ".action": {
        opacity: 1
      }
    }
  },
  td: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxShadow: `-1px 0 0 ${colors.gray[2]}`
  },
  thinLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.gray[2]
  }
}))