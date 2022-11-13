import { rgbToHsl, hslToRgb } from "./utils";

export default class Vintage {
  canvas: HTMLCanvasElement;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, img: HTMLImageElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.img = img;

    this.img.addEventListener('load', () => {
      this.canvas.width = this.img.naturalWidth;
      this.canvas.height = this.img.naturalHeight;
      this.filterImage();
      this.addNoise();
    });
  }

  filterImage() {
    this.ctx.filter = 'blur(2px) saturate(70%) contrast(80%) sepia(70%)';

    // Decrease saturation by 70%
    this.modifySaturation(0.7);

    this.ctx.drawImage(this.img, 0, 0);
  }

  modifySaturation(modifier: number) {
    const imageData = this.ctx.getImageData(0 , 0, this.canvas.width, this.canvas.height);
    const { data } = imageData;
    const dataLen = data.length;

    for (let i = 0; i < dataLen; i += 4) {
      // Convert rgb to hsl
      const { h, s, l } = rgbToHsl(data[i + 0], data[i + 1], data[i + 2]);

      // Modify `s` value in hsl and convert hsl to rgb
      const { r, g, b } = hslToRgb(h, s * modifier, l);

      data[i + 0] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }

  addNoise() {
    const imageData = this.ctx.getImageData(0 , 0, this.canvas.width, this.canvas.height);
    const { data } = imageData;
    const dataLen = data.length;
    const arbitraryIncrement = 12;
  
    for (let i = 0; i < dataLen; i += arbitraryIncrement) {
      const rand = Math.random();
      // We want to modify only 10% of the pixels of the original image.
      // Theoretically, `rand < 0.1` has about a 10% probability of returning true.
      if (rand < 0.1) {
        const val = Math.floor(Math.random() * 255);
        data[i + 0] = val;     // R value
        data[i + 1] = val;     // G value
        data[i + 2] = val;     // B value
        data[i + 3] = val;     // A value 
      }
    }
  
    this.ctx.putImageData(imageData, 0, 0);
  };
}
