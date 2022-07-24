import { useEffect, useState } from "react";

export const normalizeString = (str: string) => {
  return str.replace(" ", "_").toLowerCase();
};

export function stringToASCII(value: string): number[] {
  let ascii: number[] = [];
  for (let i = 0; i < value.length; i++) {
    ascii[i] = value.charCodeAt(i);
  }
  return ascii;
}
