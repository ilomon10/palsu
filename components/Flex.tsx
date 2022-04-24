import { DefaultProps } from "@mantine/core"
import React from "react"
import { Box } from "./Box";
import { SharedBoxStylesProps } from "./Box.styles";
import useStyles, { SharedFlexStylesProps } from "./Flex.styles"

export interface SharedFlexProps extends DefaultProps, SharedFlexStylesProps, SharedBoxStylesProps {
  // className?: DefaultProps["className"];
  component?: React.ElementType;
}

export const Flex: React.FC<SharedFlexProps> = ({
  children,
  className,

  align,
  direction,

  ...boxProps
}) => {
  const { classes, cx } = useStyles({
    align,
    direction,
  });
  return (
    <Box
      className={cx(classes.root, className)}
      {...boxProps}
    >
      {children}
    </Box>
  )
}
