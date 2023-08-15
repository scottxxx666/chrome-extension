(async () => {
    let intervalId
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(request)
            const {type} = request
            if (type === 'START') {
                intervalId = setInterval(()=>{
                    chrome.runtime.sendMessage({type: "MSG", data: "wwww"});
                }, 1000)
            }else if (type === 'STOP'){
                clearInterval(intervalId)
            }
        }
    );

    chrome.runtime.sendMessage({type: "PTT"});

    function sendPushes (pushes) {
        chrome.runtime.sendMessage({type: "MSG", data: pushes});
    }

    const src = chrome.runtime.getURL("wasm_exec.js");
    await import(src);

    const go = new Go();
    WebAssembly.instantiateStreaming(fetch(chrome.runtime.getURL("ptt.wasm")), go.importObject).then(result => {
        go.run(result.instance)

        pollingMessages("account", "password", true, "C_Chat", "#1asqyVwN", sendPushes)
    })
})();
