(async () => {
    const src = chrome.runtime.getURL("wasm_exec.js");
    await import(src);

    const go = new Go();
    const wasm = await WebAssembly.instantiateStreaming(fetch(chrome.runtime.getURL("ptt.wasm")), go.importObject)
    go.run(wasm.instance)

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request)
            const {type} = request
            if (type === 'START') {
                pollingMessages("account", "password", true, "C_Chat", "#1asqyVwN", sendPushes)
            }
        }
    );

    chrome.runtime.sendMessage({type: "PTT"});

    function sendPushes(pushes) {
        chrome.runtime.sendMessage({type: "MSG", data: pushes});
    }
})();
