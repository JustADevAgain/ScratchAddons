export default async function ({ addon, console }) {
  // Accounts for Scratch editor
  function toEditorSVG(element) {
    const svg = element.cloneNode(true);
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", "about:blank");
    document.body.append(iframe);
    iframe.contentDocument.body.appendChild(svg);

    const svgWindow = iframe.contentWindow;
    var translate, x, y, size;

    for (var textElement of svg.getElementsByTagName("text")) {
      try {
        translate = textElement.getAttribute("transform").split("(")[1].split(")")[0].split(", ");
      } catch {
        translate = ["0", "0"];
      }
      translate[0] = Number.parseFloat(translate[0]);
      translate[1] = Number.parseFloat(translate[1]);

      x = "0";
      if (textElement.hasAttribute("x")) {
        x = textElement.getAttribute("x");
      }
      x = Number.parseFloat(x);

      y = "0";
      if (textElement.hasAttribute("y")) {
        y = textElement.getAttribute("y");
      }
      y = Number.parseFloat(y);

      /*size = svgWindow.getComputedStyle(textElement).getPropertyValue("font-size");
      size = Number.parseFloat(size.split("px")[0]);*/

      textElement.setAttribute("transform", `translate(${translate[0] + x}, ${translate[1] + y - 16}) `);
      textElement.setAttribute("x", "0");
      textElement.setAttribute("y", "0");
    }
    iframe.remove();
    return svg;
  }

  const originalFileReader = window.FileReader;
  window.FileReader = function () {
    const realFileReader = new originalFileReader();
    const readAsArrayBuffer = Symbol();
    realFileReader[readAsArrayBuffer] = realFileReader.readAsArrayBuffer;
    realFileReader.readAsArrayBuffer = function (file) {
      if (addon.self.disabled) return realFileReader[readAsArrayBuffer](file);
      (async () => {
        if (file.type === "image/svg+xml") {
          try {
            let text = await file.text();
            const xmlParser = new DOMParser();
            const xmlDocument = xmlParser.parseFromString(text, "text/xml");
            const svgElement = xmlDocument.children[0];
            if (
              svgElement.height.baseVal.valueAsString === "100%" &&
              svgElement.width.baseVal.valueAsString === "100%"
            ) {
              svgElement.removeAttribute("height");
              svgElement.removeAttribute("width");
              text = xmlDocument.documentElement.outerHTML;
            }

            const newSVGElement = toEditorSVG(xmlDocument.querySelector("svg"));
            svgElement.replaceWith(newSVGElement);
            text = xmlDocument.documentElement.outerHTML;

            const newFile = new File([text], file.name, {
              type: file.type,
              lastModified: file.lastModified,
            });
            realFileReader[readAsArrayBuffer](newFile);
          } catch (err) {
            console.warn(err);
            realFileReader[readAsArrayBuffer](file);
          }
        } else {
          realFileReader[readAsArrayBuffer](file);
        }
      })();
      return undefined;
    };
    return realFileReader;
  };
}
