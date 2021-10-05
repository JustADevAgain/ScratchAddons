import ThumbSetter from "../../libraries/common/cs/thumb-setter.js";
import dataURLToBlob from "../../libraries/common/cs/data-url-to-blob.js";
import { init, saveConfig, isOverwritingEnabled, blockOverwriting } from "./persistent-thumb.js";

export default async function ({ addon, global, console, msg }) {
  await addon.tab.redux.waitForState((state) => state?.scratchGui?.projectState?.loadingState?.startsWith("SHOWING"));
  init(console);
  const vm = addon.tab.traps.vm;
  blockOverwriting(isOverwritingEnabled(vm));
  vm.runtime.on("PROJECT_LOADED", () => blockOverwriting(isOverwritingEnabled(vm)));
  const createModal = () => {
    // User Interface
    let ignoreClickOutside = false;
    const modalOverlay = Object.assign(document.createElement("div"), {
      className: addon.tab.scratchClass("modal_modal-overlay"),
    });
    addon.tab.displayNoneWhileDisabled(modalOverlay);
    const modal = Object.assign(document.createElement("div"), {
      className: addon.tab.scratchClass("modal_modal-content", { others: "sa-animated-thumb-popup" }),
      dir: addon.tab.direction,
    });
    const modalHeader = Object.assign(document.createElement("div"), {
      className: addon.tab.scratchClass("modal_header"),
    });
    modalHeader.appendChild(
      Object.assign(document.createElement("div"), {
        className: addon.tab.scratchClass("modal_header-item", "modal_header-item-title"),
        textContent: msg("set-thumbnail"),
      })
    );
    modal.appendChild(modalHeader);
    const modalInner = Object.assign(document.createElement("div"), {
      className: "sa-animated-thumb-popup-content",
    });
    modalInner.appendChild(
      Object.assign(document.createElement("p"), {
        textContent: msg("description"),
        className: "sa-animated-thumb-text",
      })
    );
    const stopOverwritingRow = Object.assign(document.createElement("p"), {
      className: "sa-animated-thumb-text",
    });
    const stopOverwritingCheckbox = Object.assign(document.createElement("input"), {
      type: "checkbox",
      checked: true,
      id: "sa-animated-thumb-stop-overwrite",
    });
    const stopOverwritingLabel = Object.assign(document.createElement("label"), {
      textContent: msg("keep-thumb"),
      htmlFor: "sa-animated-thumb-stop-overwrite",
    });
    stopOverwritingRow.appendChild(stopOverwritingCheckbox);
    stopOverwritingRow.appendChild(stopOverwritingLabel);
    modalInner.appendChild(stopOverwritingRow);
    modalInner.appendChild(
      Object.assign(document.createElement("p"), {
        textContent: msg("keep-thumb-desc"),
        className: "sa-animated-thumb-text",
      })
    );
    const modalButtons = Object.assign(document.createElement("div"), {
      className: addon.tab.scratchClass("prompt_button-row", { others: "sa-animated-thumb-popup-actions" }),
    });
    const uploadFromFileButton = Object.assign(document.createElement("button"), {
      textContent: msg("select-file"),
      className: "sa-animated-thumb-popup-action",
    });
    const uploadFromStageButton = Object.assign(document.createElement("button"), {
      textContent: msg("use-stage"),
      className: "sa-animated-thumb-popup-action",
    });
    modalButtons.appendChild(uploadFromFileButton);
    modalButtons.appendChild(uploadFromStageButton);
    modalInner.appendChild(modalButtons);
    const modalResultArea = Object.assign(document.createElement("div"), {
      className: "sa-animated-thumb-popup-result sa-animated-thumb-popup-result-none",
    });
    modalInner.appendChild(modalResultArea);

    // Logic
    const setter = new ThumbSetter(null, (file) => {
      // Confirm for GIF files about animated files
      if (file.type === "image/gif" && !confirm(msg("gif"))) {
        return Promise.reject("Aborted");
      }
      return Promise.resolve();
    });
    let handleClickOutside;
    const closePopup = () => {
      setter.removeFileInput();
      modalOverlay.remove();
      document.body.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
    handleClickOutside = (e) => {
      if (ignoreClickOutside || modal.contains(e.target)) return;
      closePopup();
    };
    document.body.addEventListener("click", handleClickOutside, {
      capture: true,
    });

    const buttonRow = Object.assign(document.createElement("div"), {
      className: addon.tab.scratchClass("prompt_button-row", { others: "sa-animated-thumb-popup-buttons" }),
    });
    const closeButton = Object.assign(document.createElement("button"), {
      textContent: msg("close"),
    });
    closeButton.addEventListener("click", closePopup, { once: true });
    buttonRow.appendChild(closeButton);
    modalInner.appendChild(buttonRow);
    modal.appendChild(modalInner);
    modalOverlay.append(modal);

    setter.onFinished = (promise) =>
      promise
        .then(
          (canceled) => {
            if (canceled) return;
            modalResultArea.className = "sa-animated-thumb-popup-result sa-animated-thumb-popup-result-success";
            modalResultArea.textContent = msg("successful");
            saveConfig(vm, stopOverwritingCheckbox.checked, msg("used-external-tools"));
          },
          (status) => {
            modalResultArea.className = "sa-animated-thumb-popup-result sa-animated-thumb-popup-result-failure";
            switch (status) {
              case 503:
              case 500:
                modalResultArea.textContent = msg("server-error");
                break;
              case 413:
                modalResultArea.textContent = msg("too-big");
                break;
              default:
                modalResultArea.textContent = msg("error");
            }
          }
        )
        .finally(() => {
          ignoreClickOutside = false;
          uploadFromFileButton.removeAttribute("disabled");
          uploadFromStageButton.removeAttribute("disabled");
        });

    const upload = () => {
      modalResultArea.className = "sa-animated-thumb-popup-result sa-animated-thumb-popup-result-none";
      uploadFromFileButton.setAttribute("disabled", "true");
      uploadFromStageButton.setAttribute("disabled", "true");
    };

    uploadFromFileButton.addEventListener("click", () => {
      setter.addFileInput();
      ignoreClickOutside = true; // To stop modal from being closed
      setter.showInput();
    });
    uploadFromStageButton.addEventListener("click", () => {
      addon.tab.traps.vm.postIOData("video", { forceTransparentPreview: true });
      addon.tab.traps.vm.renderer.requestSnapshot((dataURL) => {
        addon.tab.traps.vm.postIOData("video", { forceTransparentPreview: false });
        setter.upload(dataURLToBlob(dataURL));
      });
      addon.tab.traps.vm.renderer.draw();
    });

    document.body.appendChild(modalOverlay);
  };

  while (true) {
    let nav = await addon.tab.waitForElement("[class^='menu-bar_main-menu']", {
      markAsSeen: true,
      reduxEvents: ["scratch-gui/mode/SET_PLAYER", "fontsLoaded/SET_FONTS_LOADED", "scratch-gui/locales/SELECT_LOCALE"],
      reduxCondition: (state) => !state.scratchGui.mode.isPlayerOnly,
    });
    if (document.querySelector("[class*='project-title-input_title-field']")) {
      let setthumb = document.createElement("div");
      addon.tab.displayNoneWhileDisabled(setthumb, { display: "flex" });
      setthumb.classList.add(addon.tab.scratchClass("menu-bar_menu-bar-item"));
      setthumb.title = msg("added-by");
      let thumbinner = document.createElement("span");
      thumbinner.setAttribute(
        "class",
        addon.tab.scratchClass(
          "button_outlined-button",
          "menu-bar_menu-bar-button",
          "community-button_community-button"
        )
      );
      thumbinner.setAttribute("role", "button");
      setthumb.append(thumbinner);
      let thumbcontent = document.createElement("div");
      setthumb.classList.add(addon.tab.scratchClass("button_content"));
      thumbinner.append(thumbcontent);
      let thumbspan = document.createElement("span");
      thumbspan.textContent = msg("set-thumbnail");
      thumbcontent.append(thumbspan);
      nav.append(setthumb);
      setthumb.addEventListener("click", () => createModal());
    }
  }
}
