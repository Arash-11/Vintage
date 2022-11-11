import ImageUploader from "./ImageUploader";
import Vintage from "./Vintage";

const canvas: HTMLCanvasElement = document.querySelector('.canvas')!;
const img = new ImageUploader(new Image());

new Vintage(canvas, img);
