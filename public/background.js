chrome.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                const text = document.body.innerText.trim();
                chrome.runtime.sendMessage({ action: "sendText", text });
            }
        });
    }
});
