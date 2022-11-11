export default class ImageUploader {
  canvas: HTMLCanvasElement;
  uploadLabelText: HTMLLabelElement;
  uploadInput: HTMLInputElement;
  originalImg: HTMLImageElement;
  downloadEl: HTMLAnchorElement;
  errorTextEl: HTMLParagraphElement;
  imgEl: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.uploadLabelText = document.querySelector('[data-upload-label-text]')!;
    this.uploadInput = document.querySelector('[data-upload-input]')!;
    this.originalImg = document.querySelector('[data-original-img]')!;
    this.downloadEl = document.querySelector('[data-download]')!;
    this.errorTextEl = document.querySelector('[data-error-text]')!;
    this.imgEl = new Image();

    this.onInitialLoad();

    this.listenForImgUpload();
  }

  get image(): HTMLImageElement {
    return this.imgEl;
  }

  onInitialLoad() {
    this.imgEl.src = this.originalImg.src;
  }

  listenForImgUpload() {
    this.uploadInput.addEventListener('change', evt => {
      const reader = new FileReader();
      const file = (evt.target as HTMLInputElement)!.files![0];

      if (!file) return;

      if (file.type.split('/')[0] !== 'image') {
        this.displayErrorText();
        return;
      }

      reader.readAsDataURL(file);

      reader.addEventListener('loadstart', () => {
        this.uploadLabelText.textContent = 'Uploading...';
      });

      reader.addEventListener('load', () => {
        const uploadedImg = (reader.result as string);
        this.originalImg.src = uploadedImg;
        this.imgEl.src = uploadedImg;
        this.uploadLabelText.textContent = 'Upload image';
        this.prepareDownloadBtn(file.name);
        this.hideErrorText();
      });
    });
  }

  prepareDownloadBtn(fileName: string) {
    this.downloadEl.href = this.canvas.toDataURL();
    this.downloadEl.download = fileName.replace(/(\w+).(\w+)/g, `$1_vintage.$2`);
  }

  displayErrorText() {
    this.errorTextEl.classList.remove('is-hidden');
  }

  hideErrorText() {
    this.errorTextEl.classList.add('is-hidden');
  }
}
