// Formula derived from this Wikipedia article:
// https://en.wikipedia.org/wiki/HSL_and_HSV#To_RGB

export const hslToRgb = (hue: number, saturation: number, lightness: number) => {
  const a = saturation * Math.min(lightness, 1 - lightness);

  function formula(n: number) {
    const k = (n + hue / 30) % 12;
    const output = lightness - a *  Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return output * 255;
  }

  return {
    r: formula(0),
    g: formula(8),
    b: formula(4),
  }
}
