import {
  modifyContrast,
  modifySaturation,
  addNoise,
  addSepia,
} from "./utils";

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
      this.applyFilters();
    });
  }

  applyFilters() {
    this.ctx.drawImage(this.img, 0, 0);

    const imageData = this.ctx.getImageData(0 , 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const dataLen = data.length;

    for (let i = 0; i < dataLen; i += 4)  {
      const r = data[i + 0];
      const g = data[i + 1];
      const b = data[i + 2];

      // To do: Apply blur (approx. 2px)

      // Decrease saturation to 70%
      const { satR, satG, satB } = modifySaturation({ r, g, b }, 0.7);

      // Decrease contrast to 80%
      const { conR, conG, conB } = modifyContrast({ r: satR, g: satG, b: satB }, 0.8);

      // Apply sepia
      const { sepR, sepG, sepB } = addSepia({ r: conR, g: conG, b: conB });

      // To do: Apply vignetting effect

      data[i + 0] = sepR;
      data[i + 1] = sepG;
      data[i + 2] = sepB;
    }

    this.ctx.putImageData(imageData, 0, 0);

    const newImageData = this.ctx.getImageData(0 , 0, this.canvas.width, this.canvas.height);
    addNoise(this.ctx, newImageData);
  }
}
