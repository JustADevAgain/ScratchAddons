chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request && request.msg) {
    return sendResponse(scratchAddons.l10n.get(request.msg, request.placeholders || {}));
  }
  if (request && request.messages) {
    return sendResponse(request.messages.map((value) => scratchAddons.l10n.messages[value] || value));
  }
});
