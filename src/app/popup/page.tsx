"use client";
import { useEffect, useState } from "react";

export default function Popup() {
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
            if (message.action === "sendText" && message.text) {
                setWordCount(message.text.split(/\s+/).filter(Boolean).length);
            }
        });

        // Request text from content script when popup opens
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.id) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: () => {
                        const text = document.body.innerText.trim();
                        chrome.runtime.sendMessage({ action: "sendText", text });
                    }
                });
            }
        });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold">Word Count</h1>
            <p>{wordCount} words found on this page.</p>
        </div>
    );
}
