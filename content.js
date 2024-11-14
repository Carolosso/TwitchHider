// Load blocklist from storage and hide matching streamers
chrome.storage.sync.get(["blockList"], ({ blockList }) => {
    if (!blockList) blockList = [];

    const hideStreamers = () => {
        // 1. Hide regular streamer containers
        const streamerContainers = document.querySelectorAll('.ScTransitionBase-sc-hx4quq-0.iEzfDB');
        streamerContainers.forEach(container => {
            const usernameElement = container.querySelector('.Layout-sc-1xcs6mc-0.bQImNn');
            if (usernameElement) {
                const username = usernameElement.innerText.trim();
                if (blockList.includes(username)) {
                    container.style.display = "none";
                }
            }
        });

        // 2. Hide featured streamer containers
        const featuredContainers = document.querySelectorAll('.featured-content-carousel__item-container');
        featuredContainers.forEach(container => {
            const featuredUsernameElement = container.querySelector('.CoreText-sc-1txzju1-0.jkurzn.InjectLayout-sc-1i43xsx-0.carousel-metadata--top-text');
            if (featuredUsernameElement) {
                const featuredUsername = featuredUsernameElement.innerText.trim();
                if (blockList.includes(featuredUsername)) {
                    container.style.display = "none";
                }
            }
        });

        // 3. Hide additional streamer containers with "Layout-sc-1xcs6mc-0 dUClxi"
        const additionalContainers = document.querySelectorAll('.Layout-sc-1xcs6mc-0.dUClxi');
        additionalContainers.forEach(container => {
            const usernameElement = container.querySelector('.Layout-sc-1xcs6mc-0.bQImNn');
            if (usernameElement) {
                const username = usernameElement.innerText.trim();
                if (blockList.includes(username)) {
                    container.style.display = "none";
                }
            }
        });

        // 4. Hide sidebar items
        const sidebarItems = document.querySelectorAll('.ScTransitionBase-sc-hx4quq-0.bpYTCk.tw-transition');
        sidebarItems.forEach(item => {
            const sidebarUsernameElement = item.querySelector('.CoreText-sc-1txzju1-0.fdYGpZ.HcPqQ.InjectLayout-sc-1i43xsx-0');
            if (sidebarUsernameElement) {
                const sidebarUsername = sidebarUsernameElement.innerText.trim();
                if (blockList.includes(sidebarUsername)) {
                    item.style.display = "none";
                }
            }
        });
    };

    // Initial hide on page load
    hideStreamers();

    // Re-run every 2 seconds to catch dynamically loaded content
    setInterval(hideStreamers, 1500);
});
