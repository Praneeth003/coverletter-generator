function getTextFromPage() {
    return document.body.innerText.trim();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
        const text = getTextFromPage();
        sendResponse({ text });
    }
});
