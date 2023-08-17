(async () => {
    let intervalId
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request)
            const {type} = request
            if (type === 'START') {
                let i = 1;
                intervalId = setInterval(async () => {
                    await chrome.runtime.sendMessage({
                        type: "MSG", data: JSON.stringify([
                            {user: 'u1', time: 'time', message: `message${i + 3}`},
                            {user: 'u1', time: 'time', message: `message${i + 2}`},
                            {user: 'u1', time: 'time', message: `message${i + 1}`},
                            {user: 'u1', time: 'time', message: `message${i}`},
                        ])
                    });
                    i += 4;
                }, 1000)
                // pollingMessages("account", "password", true, "C_Chat", "#1asqyVwN", sendPushes)
            } else if (type === 'STOP') {
                clearInterval(intervalId)
            }
        }
    );

    chrome.runtime.sendMessage({type: "PTT"});

    function sendPushes(pushes) {
        chrome.runtime.sendMessage({type: "MSG", data: pushes});
    }

    const src = chrome.runtime.getURL("wasm_exec.js");
    await import(src);

    const go = new Go();
    WebAssembly.instantiateStreaming(fetch(chrome.runtime.getURL("ptt.wasm")), go.importObject).then(result => {
        go.run(result.instance)
    })
})();
