import ImageUploadDownload from "./ImageUploadDownload";
import Vintage from "./Vintage";

const canvas: HTMLCanvasElement = document.querySelector('.canvas')!;
const imageUploadDownload = new ImageUploadDownload(canvas);

new Vintage(canvas, imageUploadDownload.image);
