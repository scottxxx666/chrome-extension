(async () => {
    let chat;
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            const {type, data} = request;
            if (type === 'START') {
                const chatContainer = document.querySelector('#chat-container')
                let child = chatContainer.lastElementChild;
                while (child) {
                    chatContainer.removeChild(child);
                    child = chatContainer.lastElementChild;
                }
                chat = document.createElement('div');
                chat.style.background = 'white';
                chat.style.height = '100px';
                chat.style.overflowY = 'scroll';
                chatContainer.appendChild(chat);
            } else if (type === 'MSG') {
                const msgs = JSON.parse(data);
                const msgCount = chat.childElementCount
                const frag = document.createDocumentFragment();
                for (let i = msgs.length - 1; i >= 0; i--) {
                    const m = msgs[i]
                    const div = document.createElement('div');
                    div.appendChild(document.createTextNode(`${m.user}: ${m.message} ${m.time}`))
                    frag.appendChild(div)
                    chat.appendChild(frag)

                    for (let j = msgCount; j > 15; j--) {
                        chat.removeChild(chat.firstChild);
                    }
                    chat.lastElementChild.scrollIntoView({block: 'nearest', inline: 'nearest'})
                }
            }
        }
    );

    chrome.runtime.sendMessage({type: "CHAT"});
})();