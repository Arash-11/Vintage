export default class ImageUploader {
  imgEl: HTMLImageElement;
  fileUploader: HTMLInputElement;

  constructor(imgEl: HTMLImageElement) {
    this.imgEl = imgEl;
    this.fileUploader = document.querySelector('[data-file-uploader]')!;

    return this.getUploadedImage();
  }

  getUploadedImage(): HTMLImageElement {
    this.fileUploader.addEventListener('change', evt => {
      const reader = new FileReader();

      reader.readAsDataURL(evt!.target!.files[0]);

      reader.addEventListener('loadend', () => {
        this.imgEl.src = reader.result!;
      });
    });

    return this.imgEl;
  }
}
