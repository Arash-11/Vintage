// https://en.wikipedia.org/wiki/Grayscale#Luma_coding_in_video_systems

import { rgbaProps } from "../types";

export const modifySaturation = (
  { r, g, b }: rgbaProps,
  saturation: number
) => {
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return {
    satR: r + saturation * (luma - r),
    satG: g + saturation * (luma - g),
    satB: b + saturation * (luma - b),
  };
};
