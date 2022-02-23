/*
  Auto-escape input to prevent XSS.
  Usage: autoescaper`trusted code ${untrusted value}`
*/

const escapeHTML = (str) => str.replace(/([<>'"&])/g, (_, l) => `&#${l.charCodeAt(0)};`);
const autoescaper = (strings, ...dangerous) => {
  let r = "";
  let i = 0;
  for (; i < strings.length; i++) {
    r += strings[i];
    if (i !== dangerous.length) r += escapeHTML(String(dangerous[i]));
  }
  return r;
};

/**
 * Auto-escapes inputs of template strings.
 * @param {string[]} strings - the template string.
 * @param {...string} dangerous - the inputs.
 * @return {string} string with inputs escaped.
 */
export default autoescaper;

/**
 * Escapes HTML special characters.
 * @param {string} str - the string.
 * @returns {string} HTML-escaped string.
 */
export { escapeHTML };
