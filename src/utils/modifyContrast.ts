// https://math.stackexchange.com/questions/906240/algorithms-to-increase-or-decrease-the-contrast-of-an-image

// https://docs.opencv.org/2.4/doc/tutorials/core/basic_linear_transform/basic_linear_transform.html

import { rgbaProps } from "../types";

export const modifyContrast = (
  { r, g, b }: rgbaProps,
  contrast: number,
  brightness: number = 0
) => {
  // Limit the value between 0 and 255
  function truncate(val: number) {
    return Math.min(255, Math.max(0, val));
  }

  return {
    conR: truncate(contrast) * (r - 128) + 128 + brightness,
    conG: truncate(contrast) * (g - 128) + 128 + brightness,
    conB: truncate(contrast) * (b - 128) + 128 + brightness,
  };
};
