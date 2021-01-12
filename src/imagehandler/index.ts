// export function imageHandler(fileInputID, canvasCreator) {
//   const bdFile = document.getElementById(fileInputID);

//   bdFile.addEventListener('change', (ev) => {
//     var input = ev.target as HTMLInputElement;
//     var url = input.value;
//     var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
//     console.log('ext', url, ext);
//     if (input.files && input.files[0] && (ext == 'gif' || ext == 'png' || ext == 'jpeg' || ext == 'jpg')) {
//       var reader = new FileReader();

//       reader.addEventListener('load', (readerLoadEvent) => {
//         console.log('readerLoadEvent', readerLoadEvent.target.result);

//         const base_image = new Image();
//         base_image.src = readerLoadEvent.target.result.toString();
//         base_image.addEventListener('load', () => {
//           console.log('height', base_image.height, 'width', base_image.width);
//           canvasCreator.addImage(base_image);
//         });
//       });
//       reader.readAsDataURL(input.files[0]);
//     } else {
//       console.log('ELSE!!!');
//     }
//   });
// }

export function imageHandler(input: HTMLInputElement) {
  var url = input.value;
  var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  console.log('ext', url, ext);
  return new Promise((resolve, reject) => {
    if (input.files && input.files[0] && (ext == 'gif' || ext == 'png' || ext == 'jpeg' || ext == 'jpg')) {
      var reader = new FileReader();
      reader.addEventListener('load', (readerLoadEvent) => {
        const base_image = new Image();
        base_image.src = readerLoadEvent.target.result.toString();
        base_image.addEventListener('load', () => {
          console.log('height', base_image.height, 'width', base_image.width);

          resolve(base_image);
        });
      });
      reader.readAsDataURL(input.files[0]);

      // var reader = new FileReader();

      // reader.addEventListener('load', (readerLoadEvent) => {
      //   console.log('readerLoadEvent', readerLoadEvent.target.result);

      //   const base_image = new Image();
      //   base_image.src = readerLoadEvent.target.result.toString();
      //   base_image.addEventListener('load', () => {
      //     console.log('height', base_image.height, 'width', base_image.width);
      //     canvasCreator.addImage(base_image);
      //   });
      // });
    } else {
      reject();
    }
  });
}
