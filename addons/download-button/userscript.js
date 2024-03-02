import downloadBlob from "../../libraries/common/cs/download-blob.js";

export default async function ({ addon, console, msg }) {
  const vm = addon.tab.traps.vm;
  const { redux } = addon.tab;

  const username = await addon.auth.fetchUsername();

  await redux.waitForState((state) => state.preview.status.project === "FETCHED");
  const projectAuthor = redux.state.preview.projectInfo.author?.username;

  const isOwn = username === projectAuthor;
  const shared = addon.tab.redux.state.preview.projectInfo.is_published;

  async function download() {
    const downloadButton = document.querySelector(".sa-download-button");
    if (downloadButton.classList.contains("waiting")) return;
    downloadButton.classList.add("loading");
    try {
      const project = await vm.saveProjectSb3();
      const title = isOwn ? document.querySelector(".project-title input") : document.querySelector(".project-title");
      downloadBlob(`${isOwn ? title.value : title.innerText}.sb3`, project);
    } finally {
      downloadButton.classList.remove("loading");
    }
  }

  const downloadButton = document.createElement("button");
  downloadButton.innerText = msg("loading");
  downloadButton.onclick = download;
  downloadButton.classList = "button action-button sa-download-button waiting loading";

  function addbutton() {
    addon.tab.waitForElement(".flex-row .subactions", { markAsSeen: true });
    addon.tab.appendToSharedSpace({
      space: shared ? "afterCopyLinkButton" : "beforeProjectActionButtons",
      element: downloadButton,
      order: shared ? -1 : 1,
    });
  }

  addbutton();
  addon.tab.addEventListener("urlChange", () => {
    addbutton();
  });

  addon.tab.displayNoneWhileDisabled(downloadButton);

  vm.runtime.on("PROJECT_LOADED", () => {
    downloadButton.innerText = msg("download");
    downloadButton.classList.remove("waiting");
    downloadButton.classList.remove("loading");
  });
}
