import { createStyles } from "@mantine/core";

export default createStyles(({ colors }) => ({
  root: {
    
  },
  header: {
    "& .action": {
      opacity: 0,
    },
    "&:hover .action": {
      opacity: 1,
    }
  },
}))