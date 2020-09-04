import runUserscript from "./run-userscript.js";

const template = document.getElementById("scratch-addons");
const getGlobalState = () => {
  const returnValue = JSON.parse(template.getAttribute("data-global-state"));
  template.removeAttribute("data-global-state");
  return returnValue;
};

window.scratchAddons = {};
scratchAddons.globalState = getGlobalState();
scratchAddons.eventTargets = {
  auth: [],
  settings: [],
  tab: [],
};

const pendingPromises = {};
pendingPromises.msgCount = [];

scratchAddons.methods = {};
scratchAddons.methods.getMsgCount = () => {
  template.setAttribute(`data-request-msgcount__${Date.now()}`, "");
  let promiseResolver;
  const promise = new Promise((resolve) => (promiseResolver = resolve));
  pendingPromises.msgCount.push(promiseResolver);
  return promise;
};
scratchAddons.methods.getScratchVM = () => {
  if (__scratchAddonsTraps._onceMap) {
    for (const vmAttr of ["vm", "vm.propsVMBind", "vm.propsVMAssign"]) {
      const maybeVM = __scratchAddonsTraps._onceMap[vmAttr];
      if (maybeVM) return Promise.resolve(maybeVM);
    }
  }
  if (window._scratchAddonsScratchVM) return Promise.resolve(window._scratchAddonsScratchVM);
  else
    return new Promise((resolve) => {
      const handler = (e) => {
        if (!e.trapName.startsWith("vm")) return;
        resolve(e.value);
        __scratchAddonsTraps._targetOnce.removeEventListener("trapready", handler);
      };
      __scratchAddonsTraps._targetOnce.addEventListener("trapready", handler);
    });
};

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    const attr = mutation.attributeName;
    const attrType = attr.substring(0, attr.indexOf("__"));
    const attrRawVal = template.getAttribute(attr);
    let attrVal;
    try {
      attrVal = JSON.parse(attrRawVal);
    } catch (err) {
      attrVal = attrRawVal;
    }
    if (attrVal === null) return;
    const removeAttr = () => template.removeAttribute(attr);
    if (attr === "data-global-state") scratchAddons.globalState = getGlobalState();
    else if (attr === "data-msgcount") {
      pendingPromises.msgCount.forEach((promiseResolver) => promiseResolver(attrVal));
      pendingPromises.msgCount = [];
      removeAttr();
    } else if (attrType === "data-fire-event") {
      if (attrVal.addonId) {
        const settingsEventTarget = scratchAddons.eventTargets.settings.find(
          (eventTarget) => eventTarget._addonId === attrVal.addonId
        );
        settingsEventTarget.dispatchEvent(new CustomEvent("change"));
      } else
        scratchAddons.eventTargets[attrVal.target].forEach((eventTarget) =>
          eventTarget.dispatchEvent(new CustomEvent(attrVal.name))
        );
    }
  }
});
observer.observe(template, { attributes: true });

for (const addon of JSON.parse(template.getAttribute("data-userscripts"))) {
  if (addon.scripts.length) runUserscript(addon);
  if (addon.styles.length) {
    for (const stylesheetPath of addon.styles) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${document.getElementById("scratch-addons").getAttribute("data-path")}addons/${
        addon.addonId
      }/${stylesheetPath}`;
      document.body.appendChild(link);
    }
  }
}
