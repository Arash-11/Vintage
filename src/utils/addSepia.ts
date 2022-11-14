// https://stackoverflow.com/questions/36434905/processing-an-image-to-sepia-tone-in-python

import { rgbaProps } from "../types";

export const addSepia = ({ r, g, b }: rgbaProps) => {
  const newR = r * 0.393 + g * 0.769 + b * 0.189;
  const newG = r * 0.349 + g * 0.686 + b * 0.168;
  const newB = r * 0.272 + g * 0.534 + b * 0.131;

  return {
    sepR: Math.min(255, newR),
    sepG: Math.min(255, newG),
    sepB: Math.min(255, newB),
  };
};
