import { createStyles, DefaultProps } from "@mantine/core";
import { SharedBoxStylesProps } from "./Box.styles";

export interface SharedFlexStylesProps extends SharedBoxStylesProps {
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  direction?: "column" | "row" | "columnReverse" | "rowReverse";
  justify?: "start" | "center" | "end" | "between";
  wrap?: "noWrap" | "wrap" | "wrapReverse";
}

function sw(options: [any, any][], input: string) {
  let result = options.find(opt => input === opt[0]);
  return result?.[1];
}

export default createStyles((theme, { align, direction, justify, wrap, shrink, grow }: SharedFlexStylesProps) => {
  return ({
    root: {
      display: "flex",
      alignItems: align && sw([
        ["start", "flex-start"],
        ["center", "center"],
        ["end", "flex-end"],
        ["stretch", "stretch"],
        ["baseline", "baseline"],
      ], align),
      flexDirection: direction && sw([
        ["column", "column"],
        ["row", "row"],
        ["columnReverse", "column-reverse"],
        ["rowReverse", "row-reverse"],
      ], direction),
      justifyContent: justify && sw([
        ["start", "flex-start"],
        ["center", "center"],
        ["end", "flex-end"],
        ["between", "between"],
      ], justify),
      wrap: wrap && sw([
        ["noWrap", "nowrap"],
        ["wrap", "wrap"],
        ["wrapReverse", "wrap-reverse"],
      ], wrap),
    },
  })
})