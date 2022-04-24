import { createStyles } from "@mantine/core";

export interface SharedBoxStylesProps {
  grow?: boolean;
  shrink?: boolean;
}

function sw(options: [any, any][], input: any) {
  let result = options.find(opt => input === opt[0]);
  return result?.[1];
}

export default createStyles((theme, {
  grow,
  shrink,
}: SharedBoxStylesProps) => ({
  root: {
    boxSizing: "border-box",
    flexGrow: sw([
      [true, 1],
      [false, 0],
    ], grow),
    flexShrink: sw([
      [true, 1],
      [false, 0],
    ], shrink),
  }
}))