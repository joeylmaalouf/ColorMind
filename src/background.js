chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  title: "Toggle",
  contexts: ["browser_action"],
  onclick: function () {
    chrome.storage.sync.get("enabled", function (data) {
      data["enabled"] = !data["enabled"];
      chrome.storage.sync.set(data);
    });
    window.location.reload();
  }
});
