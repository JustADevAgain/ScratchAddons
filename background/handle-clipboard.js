/**
 * @param {any} dataURL
 *
 * @returns
 */
const dataURLToArrayBuffer = function (dataURL) {
  const byteString = atob(dataURL.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }
  return arrayBuffer;
};

if(typeof browser !== "undefined"){
// Firefox
browser?.runtime?.onMessage?.addListener(
  /** @param {any} request */ function (request) {
    if (request.clipboardDataURL && browser && browser.clipboard && browser.clipboard.setImageData) {
      const arrayBuffer = dataURLToArrayBuffer(request.clipboardDataURL);
      return browser.clipboard
        .setImageData(arrayBuffer, "png")
        .then(() => Promise.resolve("success"))
        .catch(
          /** @param {Error} e */ (e) => {
            console.error(e);
            Promise.reject(e.toString());
          }
        );
    }
  }
);
}