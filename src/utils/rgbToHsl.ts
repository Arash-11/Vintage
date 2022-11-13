// Formula derived from this Wikipedia article:
// https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation

export const rgbToHsl = (rVal: number, gVal: number, bVal: number) => {
  const r = rVal / 255;
  const g = gVal / 255;
  const b = bVal / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const c = max - min;

  let hue = 0, saturation = 0, lightness = 0;

  function calculateHue() {
    if (c !== 0) {
      switch (max) {
        case r:
          hue = (((g - b) / c) % 6) * 60;
          break;
        case g:
          hue = (((b - r) / c) + 2) * 60;
          break;
        case b:
          hue = (((r - g) / c) + 4) * 60;
          break;
      }
    }
  }

  function calculateLightness() {
    lightness = (max + min) / 2;
  }

  function calculateSaturation() {
    if (lightness !== 0 && lightness !== 1) {
      saturation = c / (1 - Math.abs(2 * lightness - 1));
    }
  }

  calculateHue();
  calculateLightness();
  calculateSaturation();

  return { h: hue, s: saturation, l: lightness };
}
