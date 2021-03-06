export function imageUploader(input: HTMLInputElement): Promise<HTMLImageElement> {
  var url = input.value;
  var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();

  return new Promise((resolve, reject) => {
    if (input.files && input.files[0] && (ext == 'gif' || ext == 'png' || ext == 'jpeg' || ext == 'jpg')) {
      var reader = new FileReader();
      reader.addEventListener('load', (readerLoadEvent) => {
        const base_image = new Image();
        base_image.src = readerLoadEvent.target.result.toString();
        base_image.addEventListener('load', () => {
          resolve(base_image);
        });
      });
      reader.readAsDataURL(input.files[0]);
    } else {
      reject();
    }
  });
}
