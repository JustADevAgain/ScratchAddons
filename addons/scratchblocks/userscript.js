function scaleSVG(svg, factor) {
  if (svg.classList.contains("scaled")) return;

  svg.setAttribute("width", svg.getAttribute("width") * factor);
  svg.setAttribute("height", svg.getAttribute("height") * factor);

  svg.classList.add("scaled");
}
async function getLocales(addon) {
  const category = await addon.tab.waitForElement(".linkst li:nth-child(2) a");

  const forumId = /\d+/.exec(category.href)[0];
  const forumIdToLang = {
    13: "de",
    14: "es",
    15: "fr",
    16: ["zh-cn", "zh-tw"],
    17: "pl",
    18: "ja",
    19: "nl",
    20: "pt",
    21: "it",
    22: "he",
    23: "ko",
    24: "nb",
    25: "tr",
    26: "el",
    27: "ru",
    33: "ca",
    36: "id",
    59: "fa",
  };
  let lang = ["en"];
  if (forumIdToLang[forumId]) {
    if (Array.isArray(forumIdToLang[forumId])) {
      lang = lang.concat(forumIdToLang[forumId]);
    } else {
      lang = ["en", forumIdToLang[forumId]];
    }
  }

  return lang;
}
export default async function ({ addon, global }) {
  window.scratchAddons._scratchblocks3Enabled = true;

  let languages = ['en']
  const oldScript = await addon.tab.waitForElement("script[src*='scratchblocks.js']");
  oldScript.remove();

  // Translations can't load first
  await addon.tab.loadScript(addon.self.lib + "/thirdparty/cs/scratchblocks-v3.5.2-min.js");
  await addon.tab.loadScript(addon.self.lib + "/thirdparty/cs/translations-all-v3.5.2.js");


  function renderMatching(selector, options = {}) {
    const opts = {
      ...options,
      languages,
      style: "scratch3",
      read: scratchblocks.read,
      parse: scratchblocks.parse,
      render: scratchblocks.render,
      document: options.doc || document,
    };
    const elements = Array.from(opts.document.querySelectorAll(selector));
    for (let element of elements) {
      if (element.classList.contains("rendered")) continue;
      let code = opts.read(element, opts);
      let parsed = opts.parse(code, opts);
      let svg = opts.render(parsed, opts);
      scaleSVG(svg, 0.75);

      let container = opts.document.createElement("div");
      container.className = "scratchblocks3";
      container.appendChild(svg);

      element.innerHTML = "";
      element.classList.add("rendered");
      element.appendChild(container);
    }
  }

  window.scratchblocks.renderMatching = renderMatching;

  Object.defineProperty(window, "scratchblocks", {
    // Block other scratchblocks scripts from loading.
    writable: false,
  });

  await new Promise((resolve) => {
    if (document.readyState !== "loading") {
      resolve();
    } else {
      window.addEventListener("DOMContentLoaded", resolve, { once: true });
    }
  });

  languages = await getLocales(addon)
  const blocks = document.querySelectorAll("pre.blocks");

  if (blocks.length > 0) {
    await addon.tab.waitForElement("pre.blocks[data-original]"); // wait for cs.js to preserve the blocks
  }

  blocks.forEach((block) => {
    block.innerHTML = "";
    block.classList.remove("blocks");
    block.classList.add("blocks3");
    block.innerText = block.getAttribute("data-original");
  });


  renderMatching(".blockpost pre.blocks3");

  // Render 3.0 menu selectors

  await addon.tab.waitForElement(".scratchblocks-button");

  const scratchblocksButtons = Array.from(document.querySelectorAll(".scratchblocks-button ul a[title]")).filter(
    (el) => !!el.querySelector(".scratchblocks svg")
  );

  scratchblocksButtons.forEach((scratchblocksButton) => {
    scratchblocksButton.textContent = scratchblocksButton.title;
    scratchblocksButton.id = scratchblocksButton.title.replace(/\n/g, "-n").replace(/ /g, "").trim();
    renderMatching(`a[id='${scratchblocksButton.id}']`);
  });
}
