const color = {
  // TODO horrible text contrast
  color: "#43cfca",
  secondaryColor: "#3aa8a4",
  tertiaryColor: "#3aa8a4",
};

const ICON =
  "data:image/svg+xml;," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 386 386">
  <circle cx="193" cy="193" r="193" fill="#ff7b26"/>
  <path fill="#fff" d="M253.27617 243.4497998c-10.01656 27.85199-37.24404 44.78097-80.90724 50.32027-1.98478.24934-3.93837.4046-5.89207.46693-2.54291 3.73435-5.86103 6.97083-9.76844 9.49147-10.2335 6.56622-19.81594 9.77152-29.27425 9.77152-19.44369 0-40.376034-14.56394-40.376034-46.55474 0-2.17839.09383-5.01027.3106-8.93138.09383-1.68039.186366-2.98748.216831-3.95218-.527431-2.42737-.806379-4.8858-.806379-7.3753v-15.06193c0-2.45844.248483-4.91687.744262-7.3753.03519-2.08499.124295-4.41899.278948-6.97081-.744262-2.73848-1.302508-5.91262-1.302508-9.46031 0-1.61817.124295-3.23645.341065-4.82347 1.178395-8.34011 4.868631-16.71127 11.101902-23.40193-2.139839-6.00612-3.256224-12.3545-3.256224-18.85838v-15.87102c0-6.44178 1.271449-14.47055 7.504707-34.44936 2.60491-8.58899 3.44212-11.26525 4.58956-13.75485 6.10915-13.754741 15.31934-20.632173 22.01766-24.024252 10.94684-5.477069 22.69992-8.277763 34.91821-8.277763 5.64395 0 11.03989.591615 16.18759 1.711562 2.2949-1.555955 4.74475-2.863044 7.34965-3.952175 3.3181-1.431515 6.85339-2.427388 10.7607-3.049697 9.76845-1.680517 20.09501.404611 29.08813 5.881558 9.4583 5.7883 20.31207 17.800418 18.97863 42.509317-.21683 4.35677-.58955 10.17612-1.14746 17.76924-.0352.18702-.0352.37285-.0586.55986-.49578 5.50824-1.20946 13.72381-2.17078 24.58446.24847 4.20116.15471 8.90019-.21683 14.43949-.15471 2.11617-.49578 4.23222-1.05486 6.28617-.1243.46694-.24847.90213-.37272 1.30697 4.18649 5.38369 7.03954 10.76737 8.99325 15.43536 1.82959 3.70317 3.38011 7.96656 4.74463 13.16348.52743 1.96056.8685 3.95217 1.0232 5.97495 1.39545 17.45814.68213 27.7587-2.54291 36.47213z" style="mix-blend-mode:normal"/>
  <path fill="#ff7b26" d="M221.90961 210.3950298c.90834 11.31819.72199 18.61256-.54618 21.89877-5.27815 14.96538-23.01005 24.3604-53.18984 28.19425-10.18698 1.27909-20.36786-3.55698-30.55496-14.50783 0 1.6431.36334 6.56926 1.0947 14.78482.54619 6.02164.45242 10.94792-.27308 14.77871-4.54936 2.91902-8.18382 4.3816-10.91273 4.3816-4.18649 0-6.27345-4.10461-6.27345-12.32017 0-1.4595.0937-3.78422.27308-6.97705.1805-3.18977.2731-5.42721.2731-6.70629 0-3.10262-.2731-5.2903-.81928-6.56928v-15.0557c0-.36461.0938-.77509.2731-1.23226.17931-.454.36216-.86566.54618-1.23239-.18285-2.55183-.0938-6.4759.27308-11.76937.36216-3.28623.36216-5.38063 0-6.29545-.91186-1.82048-1.36147-2.91597-1.36147-3.28317.72316-5.10975 4.45631-7.66476 11.18254-7.66476 4.36323 0 6.99919 1.5529 7.91083 4.65235 0 2.91902.36335 7.2104 1.09119 12.86484 1.09471 6.5694 4.54619 13.14183 10.3669 19.70805 6.36335 7.48421 12.45397 10.95098 18.27773 10.40323 6.54643-.72451 13.09275-2.27788 19.63918-4.65233 9.09239-3.28623 14.54717-7.11702 16.3675-11.49556 1.2683-3.28622 1.90718-6.74981 1.90718-10.40323 0-11.12835-4.09037-19.43424-12.27406-24.90814-3.64066-2.37128-10.36689-4.28832-20.18808-5.75088-5.63774-.72453-9.09544-1.09502-10.36372-1.09502-8.72965.18347-16.86997-2.64521-24.41488-8.48632-7.54797-5.83804-11.31896-12.59409-11.31896-20.25884v-15.87407c0-3.4636 2.00023-11.58576 6.00376-24.3604 1.81413-6.02471 2.81577-9.21448 3.00177-9.58167 1.63433-3.8308 3.72446-6.38568 6.27042-7.66477 6.18053-3.099455 12.72685-4.652353 19.6392-4.652353 13.45551 0 23.36659 5.473913 29.73311 16.421833.54618.54809 1.45442 1.36918 2.72904 2.46467.17931-2.55182.54618-6.476 1.09119-11.76948-.18285-2.37127-.3657-4.652347-.54618-6.843211 0-2.551691 1.2684-4.285142 3.81741-5.200079.72549-.363446 1.72738-.637487 3.00187-.820975 1.81728-.364609 3.77405.09416 5.86723 1.366244 2.0871 1.278964 2.9522 5.112935 2.58945 11.495551-.18285 4.0144-.54619 9.6719-1.09119 16.96946-.54619 6.02469-1.36135 15.23929-2.45606 27.64966.36333 2.91902.36333 6.93659 0 12.04329-.91187 3.46676-3.64066 5.20009-8.18381 5.20009-2.36605 0-4.63609-.63748-6.81918-1.91386-1.09119-3.46359-1.63432-4.92934-1.63432-4.3816.35981-4.92627-.63878-11.49554-3.00189-19.70805-2.00329-4.19492-4.77252-10.16988-8.32024-17.9279-3.5476-7.75498-8.23022-11.90944-14.04786-12.45719-7.27511-.5481-12.00123 1.91693-14.18431 7.39095-.7255 2.37434-1.73043 5.84416-2.99883 10.40323-2.18309 6.75287-3.5476 13.23205-4.09344 19.43412-.18284 2.0103-.36568 2.83186-.54618 2.46467.54618 3.65342 1.18144 7.30061 1.91023 10.95097.90834 4.56214 3.13831 8.03196 6.68287 10.40018 3.5476 2.37434 10.31732 3.83079 20.32133 4.37853 24.54815 1.46563 39.73105 10.04228 45.55186 25.73264.906 1.46268 1.81412 3.92417 2.72586 7.38788z" style="mix-blend-mode:normal"/>
  <path fill="#ff7b26" d="M161.49989 214.4999998h138v113h-138z"/>
  <path d="M194.49982 232.4999998v15.00012h-9.99993v79.99977h115.00022v-79.99977h-9.9999v-15.00012H257.5001v15.00012h-31.00017v-15.00012z" fill="#fff"/>
</svg>`);

let vm;
const customBlocks = {};
const internalBlocksCache = {};

const getCustomBlock = (proccode) => {
  if (!Object.prototype.hasOwnProperty.call(customBlocks, proccode)) {
    return;
  }
  return customBlocks[proccode];
};

const getArgumentId = (index) => `arg${index}`;

const resetAllCaches = () => {
  for (const target of vm.runtime.targets) {
    if (target.isOriginal) {
      target.blocks.resetCache();
    }
  }
  vm.runtime.flyoutBlocks.resetCache();
};

export function addBlock(proccode, args, handler, hide) {
  if (getCustomBlock(proccode)) {
    return;
  }
  const blockData = {
    id: proccode,
    color: color.color,
    secondaryColor: color.secondaryColor,
    tertiaryColor: color.tertiaryColor,
    args,
    handler,
    hide: !!hide,
  };
  customBlocks[proccode] = blockData;
  internalBlocksCache[proccode] = [args, args.map((_, i) => getArgumentId(i)), args.map(() => "")];
  let w;
  try {
    w = Blockly.getMainWorkspace();
  } catch (e) {}
  if (w) w.getToolbox().refreshSelection();
  // TODO !!vm.editingTarget
  if (vm && vm.runtime.targets.length > 0) vm.emitWorkspaceUpdate();
  resetAllCaches();
}

export function removeBlock(proccode) {
  customBlocks[proccode] = null;
  internalBlocksCache[proccode] = null;
  resetAllCaches();
}

// TODO escapeHTML is already a thing
function xesc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const injectWorkspace = (ScratchBlocks) => {
  const BlockSvg = ScratchBlocks.BlockSvg;
  const oldUpdateColour = BlockSvg.prototype.updateColour;
  BlockSvg.prototype.updateColour = function (...args) {
    const block = this.procCode_ && getCustomBlock(this.procCode_);
    if (block) {
      this.colour_ = block.color;
      this.colourSecondary_ = block.secondaryColor;
      this.colourTertiary_ = block.tertiaryColor;
    }
    return oldUpdateColour.call(this, ...args);
  };

  const categoryHandler = (e) => {
    // TODO this is ugly
    return [
      ...new DOMParser()
        .parseFromString(
          `<top>` +
            (Object.values(customBlocks)
              .filter((e) => !e.hide)
              .map((e) => {
                try {
                  return `<block type="procedures_call" gap="16"><mutation generateshadows="true" proccode="${xesc(
                    e.id
                  )}" argumentids="${xesc(
                    JSON.stringify(e.args.map((_, i) => getArgumentId(i)))
                  )}" argumentnames="${xesc(JSON.stringify(e.args))}" argumentdefaults="${xesc(
                    JSON.stringify(e.args.map((e) => ""))
                  )}" warp="false"></mutation></block>`;
                } catch (e) {
                  console.error("Issue making block from", e);
                  return "";
                }
              })
              .join("") ||
              `<label text="${xesc(
                scratchAddons.l10n.get("noAddedBlocks", null, "No addons have added blocks.")
              )}" showStatusButton="null" />`) +
            `</top>`,
          "text/xml"
        )
        .querySelectorAll("block, label"),
    ];
  };

  const Flyout = ScratchBlocks.Flyout;
  // Each time a new workspace is made, these callbacks are reset, so re-register whenever a flyout is shown.
  // https://github.com/LLK/scratch-blocks/blob/61f02e4cac0f963abd93013842fe536ef24a0e98/core/flyout_base.js#L469
  const originalShow = Flyout.prototype.show;
  Flyout.prototype.show = function (xml) {
    this.workspace_.registerToolboxCategoryCallback("SABLOCKS", categoryHandler);
    return originalShow.call(this, xml);
  };

  // We use Scratch's extension category mechanism to create the Scratch Addons category.
  // https://github.com/LLK/scratch-gui/blob/ddd2fa06f2afa140a46ec03be91796ded861e65c/src/containers/blocks.jsx#L344
  // https://github.com/LLK/scratch-gui/blob/2ceab00370ad7bd8ecdf5c490e70fd02152b3e2a/src/lib/make-toolbox-xml.js#L763
  // https://github.com/LLK/scratch-vm/blob/a0c11d6d8664a4f2d55632e70630d09ec6e9ae28/src/engine/runtime.js#L1381
  const originalGetBlocksXML = vm.runtime.getBlocksXML;
  vm.runtime.getBlocksXML = function (target) {
    const result = originalGetBlocksXML.call(this, target);
    result.unshift({
      id: "sa-blocks",
      xml: `
          <category
            name="${xesc(scratchAddons.l10n.get("extensionName", null, "Scratch Addons"))}"
            id="sa-blocks"
            colour="#ff7b26"
            secondaryColour="#ff7b26"
            iconURI="${ICON}"
            custom="SABLOCKS">
          </category>`,
    });
    return result;
  };

  // Workspace update may be required to make category appear in flyout
  if (vm.editingTarget) {
    vm.emitWorkspaceUpdate();
  }
};

let inited = false;
export async function init(tab) {
  if (inited) return;
  inited = true;

  let getEditorMode = () => tab.clientVersion === "scratch-www" && tab.editorMode;
  if (!getEditorMode()) return;

  // TODO no weird hacks
  vm = tab.traps.vm;
  if (!vm) vm = await new Promise((cb) => __scratchAddonsTraps.addEventListener("gotvm", () => cb(tab.traps.vm)));

  const Blocks = vm.runtime.monitorBlocks.constructor;
  const originalResetCache = Blocks.prototype.resetCache;
  Blocks.prototype.resetCache = function () {
    originalResetCache.call(this);
    Object.assign(this._cache.procedureParamNames, internalBlocksCache);
  };

  const oldStepToProcedure = vm.runtime.sequencer.stepToProcedure;
  vm.runtime.sequencer.stepToProcedure = function (thread, proccode) {
    const blockData = getCustomBlock(proccode);
    if (blockData) {
      const stackFrame = thread.peekStackFrame();
      blockData.handler(stackFrame.params, thread.target.id, thread.stack[thread.stack.length - 1]);
    }
    return oldStepToProcedure.call(this, thread, proccode);
  };

  tab.traps.getBlockly().then(injectWorkspace);
}
