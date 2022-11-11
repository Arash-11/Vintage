export default class Vintage {
  canvas: HTMLCanvasElement;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, img: HTMLImageElement) {
    this.canvas = canvas;
    this.img = img;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;

    this.img.addEventListener('load', () => {
      this.canvas.width = this.img.naturalWidth;
      this.canvas.height = this.img.naturalHeight;
      this.filterImage();
      this.addNoise();
    });
  }

  filterImage() {
    this.ctx.filter = 'blur(2px) saturate(70%) contrast(80%) sepia(60%)';
    this.ctx.drawImage(this.img, 0, 0);
  }

  addNoise() {
    const imageData = this.ctx.getImageData(0 , 0, this.canvas.width, this.canvas.height);
    const { data } = imageData;
    const dataLen = data.length;
  
    for (let i = 0; i < dataLen; i += 4) {
      const rand = Math.random();
      // We're aiming to modify only 10% of the pixels of the original image.
      // Theoretically, `rand < 0.1` has about a 10% probability of returning true.
      if (rand < 0.1) {
        const val = Math.floor(rand * 255);
        data[i + 0] = val;                                 // R value
        data[i + 1] = val;                                 // G value
        data[i + 2] = val;                                 // B value
        data[i + 3] = Math.floor(Math.random() * 200);     // A value 
      }
    }
  
    this.ctx.putImageData(imageData, 0, 0);
  };
}
