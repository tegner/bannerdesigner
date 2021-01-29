import canvas2image from '../../public/notjs/canvas2image';

function downloadFile(data, fileName, type = 'text/plain') {
  // Create an invisible A element
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(new Blob([data], { type }));

  // Use download attribute to set set desired file name
  a.setAttribute('download', fileName);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

export function saveToDisk(currentArray, bannerName: string) {
  const zip = new (window as any).JSZip();
  const img = zip.folder(bannerName);
  currentArray.forEach((current) => {
    const { canvas, height, fileName, type, width } = current;

    const nameForFile = `${fileName}-${type}.png` ?? `bannermaker-${type}.png`;
    const imgDataUrl = canvas2image.convertToImage(canvas, width, height, 'png');
    const imgData = imgDataUrl.replace(/^data:image\/(png|jpg);base64,/, '');

    img.file(nameForFile, imgData, { base64: true });
  });

  // Add a file to the directory, in this case an image with data URI as contents

  // Generate the zip file asynchronously
  zip.generateAsync({ type: 'blob' }).then((content) => {
    // Force down of the Zip file
    downloadFile(content, `bannermaker-${bannerName}.zip`);
  });
}
