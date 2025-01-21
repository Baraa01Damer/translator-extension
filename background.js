chrome.contextMenus.create({
  id: "translateText",
  title: "Translate Selected Text",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translateText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showTranslationUI,
      args: [info.selectionText]
    });
  }
});

function showTranslationUI(selectedText) {
  const existingBox = document.getElementById("translation-box");
  if (existingBox) existingBox.remove();

  // Floating UI box
  const box = document.createElement("div");
  box.id = "translation-box";
  box.innerText = `Translating: "${selectedText}"...`;

  // Styles
  box.style.position = "absolute";
  box.style.top = `${window.getSelection().getRangeAt(0).getBoundingClientRect().top + window.scrollY}px`;
  box.style.left = `${window.getSelection().getRangeAt(0).getBoundingClientRect().left + window.scrollX}px`;
  box.style.backgroundColor = "white";
  box.style.border = "1px solid #ccc";
  box.style.padding = "10px";
  box.style.zIndex = "10000";
  box.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  box.style.fontFamily = "Arial, sans-serif";
  box.style.fontSize = "14px";
  box.style.width = "auto"; // Width
  box.style.maxWidth = "300px"; // Max width
  box.style.wordWrap = "break-word"; // Text wraps inside box
  box.style.overflowWrap = "break-word"; // Alternative for wrapping text
  box.style.lineHeight = "1.5"; // For readability

  // Close button
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "5px 10px";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = () => box.remove();

  box.appendChild(closeButton);
  document.body.appendChild(box);
}