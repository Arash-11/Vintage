export default class ImageUploader {
  fileUploader: HTMLInputElement;
  imgEl: HTMLImageElement;

  constructor() {
    this.fileUploader = document.querySelector('[data-file-uploader]')!;
    this.imgEl = new Image();
  }

  get image(): HTMLImageElement {
    this.fileUploader.addEventListener('change', evt => {
      const reader = new FileReader();
      const file = (evt.target as HTMLInputElement)!.files![0];

      if (file.type.split('/')[0] === 'image') {
        reader.readAsDataURL(file);

        reader.addEventListener('loadend', () => {
          this.imgEl.src = (reader.result as string);
        });
      }
    });

    return this.imgEl;
  }
}
