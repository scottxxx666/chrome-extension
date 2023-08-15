chrome.runtime.onInstalled.addListener(details => {
    console.log('details', details)
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

async function setStatus(nextState) {
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        text: nextState,
    });
}

chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({});
    // const prevState = await chrome.action.getBadgeText({tabId: tab.id});
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    if (nextState === "ON") {
        startExtension();
    } else if (nextState === "OFF") {
        stopExtension();
    }
})

let pttTab
let chatTab

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    console.log(sender.tab, request)
    const {type} = request
    if (type === 'PTT') pttTab = sender.tab.id;
    if (type === 'CHAT') chatTab = sender.tab.id;
    if (type === 'MSG' && chatTab) {
        try {
            await chrome.tabs.sendMessage(chatTab, request);
        } catch (e) {
            console.log(e);
            stopExtension();
            chatTab = null
        }
    }
});

async function startExtension() {
    if (pttTab && chatTab) {
        await chrome.tabs.sendMessage(pttTab, {type: 'START'});
        setStatus('ON');
    }
}

function stopExtension() {
    if (pttTab) {
        chrome.tabs.sendMessage(pttTab, {type: 'STOP'}).catch(e => console.log(e))
    }
    if (chatTab) {
        chrome.tabs.sendMessage(chatTab, {type: 'STOP'}).catch(e => console.log(e))
    }
    setStatus('OFF');
}
