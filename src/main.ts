import ImageUploader from "./ImageUploader";
import Vintage from "./Vintage";

const canvas: HTMLCanvasElement = document.querySelector('.canvas')!;
const imageUploader = new ImageUploader();

new Vintage(canvas, imageUploader.image);
