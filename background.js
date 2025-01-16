chrome.contextMenus.create({
    id: "translateText",
    title: "Translate Selected Text",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "translateText") {
      console.log(`Selected text: ${info.selectionText}`);
      alert(`Simulating translation for: "${info.selectionText}"`);
    }
  });
  