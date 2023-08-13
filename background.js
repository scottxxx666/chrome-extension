chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

function addRuleOverwriteOrigin() {
    chrome.declarativeNetRequest.updateDynamicRules({
            addRules: [
                {
                    action: {
                        type: "modifyHeaders",
                        requestHeaders: [
                            {
                                header: "origin",
                                operation: "set",
                                value: "https://term.ptt3.cc/"
                            }
                        ]
                    },
                    condition: {
                        urlFilter: 'wss://ws.ptt.cc/bbs', //block this websocket
                        domains: ["term.ptt.cc"], // on this domain
                    },
                    id: 2,
                    priority: 1,
                },
            ],
        },
        () => console.log("block rule added"));
}

chrome.action.onClicked.addListener(async (tab) => {
    console.log("cliock")
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({tabId: tab.id});
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        text: nextState,
    });

    if (nextState === "ON") {
        addRuleOverwriteOrigin();
    } else if (nextState === "OFF") {
        await removeAllRules();
    }
})

async function removeAllRules() {
    const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
    chrome.declarativeNetRequest.updateDynamicRules(
        {removeRuleIds: oldRules.map(e => e.id)},
        () => console.log("block rule added")
    );
}
