export default async function ({ addon, console }) {
  async function fetchAlerts(username, xToken) {
    return fetch(`https://api.scratch.mit.edu/users/${username}/messages/admin`, {
      headers: {
        "x-token": xToken,
      },
    }).then((res) => {
      if (!res.ok) throw HTTPError.fromResponse("Fetching alerts failed", res);
      return res.json();
    });
  }
  async function hasAlerts() {
    try {
      const [username, xToken] = await Promise.all([addon.auth.fetchUsername(), addon.auth.fetchXToken()]);
      if (scratchAddons.cookieFetchingFailed) throw new TypeError("NetworkError");
      if (!username) throw new MessageCache.HTTPError("User is not logged in", 401);
      const alerts = await fetchAlerts(username, xToken);
      return Array.isArray(alerts) && alerts.length > 0;
    } catch (err) {
      return false;
    }
  }
  const hasAlertsResult = await hasAlerts();
  console.log(hasAlertsResult);
  if (hasAlertsResult) {
    const messageBadge = document.querySelector(".notificationsCount");
    const originalText = messageBadge.innerText;
    messageBadge.style.backgroundColor = "#cc4400";
    messageBadge.innerText = originalText.trim() + "!";
  }
}
