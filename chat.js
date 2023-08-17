(async () => {
    let chat;
    const body = document.querySelector('body');

    const chatContainer = document.createElement('div');
    chatContainer.id = 'ptt-chat-container'
    body.appendChild(chatContainer)
    chrome.runtime.onMessage.addListener(messageListener);

    function removeChat() {
        const prev = body.querySelector('#ptt-chat-container');
        if (prev) {
            body.removeChild(prev);
        }
        return prev;
    }

    function messageListener(request, sender, sendResponse) {
        console.log(request)
        const {type, data} = request;
        if (type === 'START') {
            let child = chatContainer.lastElementChild;
            while (child) {
                chatContainer.removeChild(child);
                child = chatContainer.lastElementChild;
            }
            chat = document.createElement('div');
            chat.id = 'ptt-chat';
            chatContainer.appendChild(chat);
        } else if (type === 'MSG') {
            const msgs = JSON.parse(data);
            const frag = document.createDocumentFragment();
            for (let i = msgs.length - 1; i >= 0; i--) {
                const m = msgs[i]
                const div = document.createElement('div');
                div.appendChild(document.createTextNode(`${m.user}: ${m.message}`))
                frag.appendChild(div)
                chat.appendChild(frag)

                chat.lastElementChild.scrollIntoView({block: 'nearest', inline: 'nearest'})
            }
            const msgCount = chat.childElementCount
            for (let j = msgCount; j > 15; j--) {
                chat.removeChild(chat.firstChild);
            }
        } else if (type === 'STOP') {
            chrome.runtime.onMessage.removeListener(messageListener)
            removeChat();
        } else {
            console.log(type, data)
        }
    }
})();