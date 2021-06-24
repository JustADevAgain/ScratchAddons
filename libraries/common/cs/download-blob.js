/**
 * Downloads a Blob. From https://github.com/LLK/scratch-gui/blob/develop/src/lib/download-blob.js.
 *
 * @param {string} filename - The filename.
 * @param {Blob} blob - The blob.
 */
export default (filename, blob) => {
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);

  // Use special ms version if available to get it working on Edge.
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename);
    return;
  }

  if ("download" in HTMLAnchorElement.prototype) {
    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.type = blob.type;
    downloadLink.click();
    // remove the link after a timeout to prevent a crash on iOS 13 Safari
    window.setTimeout(() => {
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    }, 1000);
  } else {
    // iOS 12 Safari, open a new page and set href to data-uri
    let popup = window.open("", "_blank");
    const reader = new FileReader();
    reader.onloadend = function () {
      if (!popup) throw new Error("Failed to open popup");
      popup.location.href = `${reader.result}`;
      popup = null;
    };
    reader.readAsDataURL(blob);
  }
};
