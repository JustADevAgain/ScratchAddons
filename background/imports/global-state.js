// Global state is a JSON object shared between all content scripts and the background page.
// It is abstracted through a proxy in order to easily detect changes that should trigger events.
// Content scripts cannot modify global state, but they can always read from it.

const _globalState = {
  auth: {
    isLoggedIn: false,
    username: null,
    userId: null,
    xToken: null,
    csrfToken: null,
    scratchLang: null,
  },
  addonSettings: {},
  addonStorage: {
    sync: {},
    local: {},
    cookie: {},
  },
};

class StateProxy {
  constructor(name = "scratchAddons.globalState") {
    this.name = name;
  }
  get(target, key) {
    if (key === "_target") return target;
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], new StateProxy(`${this.name}.${key}`));
    } else {
      return target[key];
    }
  }
  set(target, key, value) {
    const oldValue = target[key];
    target[key] = value;
    messageForAllTabs({
      newGlobalState: _globalState
    });

    if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
      stateChange(this.name, key, value);
    }

    return true;
  }
}

function messageForAllTabs(message) {
  // May log errors to the console in Firefox, where we don't have the permission
  // to read URLs from tabs even if we have content scripts on them.
  // No need to specify frame IDs, because this message should also arrive to iframes.
  chrome.tabs.query({}, (tabs) =>
    tabs.forEach(
      (tab) => (tab.url || (!tab.url && typeof browser !== "undefined")) && chrome.tabs.sendMessage(tab.id, message)
    )
  );
}

function stateChange(parentObjectPath, key, value) {
  const objectPath = `${parentObjectPath}.${key}`;
  const objectPathArr = objectPath.split(".").slice(2);
  console.log(`%c${objectPath}`, "font-weight: bold;", "is now: ", objectPathArr[0] === "auth" ? "[redacted]" : value);
  if (objectPathArr[0] === "auth" && key !== "scratchLang") {
    scratchAddons.eventTargets.auth.forEach((eventTarget) => eventTarget.dispatchEvent(new CustomEvent("change")));
    messageForAllTabs({
      fireEvent: {
        target: "auth",
        name: "change"
      }
    });
  } else if (objectPathArr[0] === "addonSettings") {
    // Send event to persistent script and userscripts, if they exist.
    const settingsEventTarget = scratchAddons.eventTargets.settings.find(
      (eventTarget) => eventTarget._addonId === objectPathArr[1]
    );
    if (settingsEventTarget) settingsEventTarget.dispatchEvent(new CustomEvent("change"));
    messageForAllTabs({
      fireEvent: {
        target: "settings",
        name: "change",
        addonId: objectPathArr[1],
      },
    });
  }
}

export default new Proxy(_globalState, new StateProxy());
