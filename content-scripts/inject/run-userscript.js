import Addon from "../../addon-api/content-script/Addon.js";
import createConsole from "../../libraries/common/console.js";

const console=createConsole("page")

export default async function runAddonUserscripts({ addonId, scripts, enabledLate = false }) {
  const addonObj = new Addon({ id: addonId, enabledLate });
  addonObj.auth._update(scratchAddons.session);
  const globalObj = Object.create(null);
  for (const scriptInfo of scripts) {
    const { url: scriptPath, runAtComplete } = scriptInfo;
    const scriptUrl = new URL("../../" + `addons/${addonId}/${scriptPath}`, import.meta.url).href
      .replace(/(?<!\.min)\.js$/, ".js")
      .replace(/(?<!\.min)\.css$/, ".css");
    const loadUserscript = async () => {
      await scratchAddons.l10n.loadByAddonId(addonId);
      const module = await import(scriptUrl);
      const msg = (key, placeholders) =>
        scratchAddons.l10n.get(key.startsWith("/") ? key.slice(1) : `${addonId}/${key}`, placeholders);
      msg.locale = scratchAddons.l10n.locale;
      console.logForAddon(`${addonId} [page]`)(
        `Running ${scriptUrl}, runAtComplete: ${runAtComplete}, enabledLate: ${enabledLate}`
      );
      const localConsole = {
        log: console.logForAddon(addonId),
        warn: console.warnForAddon(addonId),
        error: console.errorForAddon(addonId),
      };
      module.default({
        addon: addonObj,
        global: globalObj,
        console: { ...console, ...localConsole },
        msg,
        safeMsg: (key, placeholders) =>
          scratchAddons.l10n.escaped(key.startsWith("/") ? key.slice(1) : `${addonId}/${key}`, placeholders),
      });
    };
    if (runAtComplete && document.readyState !== "complete") {
      window.addEventListener("load", () => loadUserscript(), { once: true });
    } else {
      await loadUserscript();
    }
  }
}
