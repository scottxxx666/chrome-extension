(async () => {
    console.log('content')
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
                console.log(request, sendResponse)
        }
    );

    chrome.runtime.sendMessage({type: "CHAT"});
})();