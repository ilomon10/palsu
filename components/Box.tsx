import { Box as MantineBox, BoxProps, DefaultProps, MantineStyleSystemProps, PolymorphicComponentProps } from "@mantine/core";
import React from "react"
import useStyles, { SharedBoxStylesProps } from "./Box.styles"

export interface SharedBoxProps extends SharedBoxStylesProps, MantineStyleSystemProps {
  className?: DefaultProps["className"];
}

export const Box: React.FC<SharedBoxProps> = ({
  children,
  className,
  grow,
  shrink,
  ...boxProps
}) => {
  const { classes, cx } = useStyles({
    grow, shrink,
  });
  return (
    <MantineBox className={cx(classes.root, className)} {...boxProps}>
      {children}
    </MantineBox>
  )
}