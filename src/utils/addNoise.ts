export const addNoise = (ctx: CanvasRenderingContext2D, imageData: ImageData) => {
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

  ctx.putImageData(imageData, 0, 0);
};
