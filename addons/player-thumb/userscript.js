export default async function ({ addon, global, console }) {
  const el = await addon.tab.waitForElement('div[class*="stage_green-flag-overlay-wrapper_"]', {
    markAsSeen: true,
  });

  const projectId = window.location.pathname.split("/")[2];
  const thumb = `https://uploads.scratch.mit.edu/get_image/project/${projectId}_4000x3000.png`;
  setThumb();

  addon.self.addEventListener("disabled", () => (el.style.backgroundImage = "none"));
  addon.self.addEventListener("reenabled", () => setThumb());

  function setThumb() {
    el.style.backgroundImage = `url(${thumb})`;
  }
}
