import { styled } from '../stitches.config';

export const Box = styled('div', {
  // Reset
  boxSizing: 'border-box',

  variants: {
    grow: {
      "0": {
        flexGrow: 0,
      },
      "1": {
        flexGrow: 1,
      }
    },
    shrink: {
      "0": {
        flexShrink: 0,
      },
      "1": {
        flexShrink: 1,
      }
    }
  }
});