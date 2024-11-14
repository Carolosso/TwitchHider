document.addEventListener("DOMContentLoaded", () => {
    const streamerList = document.getElementById("streamerList");
    const newStreamerInput = document.getElementById("newStreamer");
    const addStreamerButton = document.getElementById("addStreamer");

    // Load and display the block list
    const loadBlockList = () => {
        chrome.storage.sync.get(["blockList"], ({ blockList }) => {
            if (!blockList) blockList = [];
            streamerList.innerHTML = "";
            blockList.forEach((streamer) => {
                const li = document.createElement("li");
                li.className = "streamer-item";
                li.textContent = streamer;

                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = () => removeStreamer(streamer);

                li.appendChild(removeButton);
                streamerList.appendChild(li);
            });
        });
    };

    // Add a new streamer to the block list
    addStreamerButton.onclick = () => {
        const newStreamer = newStreamerInput.value.trim();
        if (newStreamer) {
            chrome.storage.sync.get(["blockList"], ({ blockList }) => {
                if (!blockList) blockList = [];
                if (!blockList.includes(newStreamer)) {
                    blockList.push(newStreamer);
                    chrome.storage.sync.set({ blockList }, loadBlockList);
                }
            });
        }
        newStreamerInput.value = ""; // Clear input
    };

    // Remove a streamer from the block list
    const removeStreamer = (streamer) => {
        chrome.storage.sync.get(["blockList"], ({ blockList }) => {
            if (!blockList) blockList = [];
            blockList = blockList.filter(item => item !== streamer);
            chrome.storage.sync.set({ blockList }, loadBlockList);
        });
    };

    // Initial load
    loadBlockList();
});
