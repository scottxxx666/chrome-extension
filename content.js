(async () => {
    let chat;
    let count = 0;
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
            } else {
                const msgs = JSON.parse(data);
                for (let i = msgs.length - 1; i >= 0; i--) {
                    const m = msgs[i]
                    const div = document.createElement('div');
                    div.appendChild(document.createTextNode(`${m.user}: ${m.message} ${m.time}`))
                    chat.appendChild(div)
                    div.scrollIntoView({block: 'nearest', inline: 'nearest'})
                    count++;
                    while (count > 15) {
                        chat.removeChild(chat.firstChild);
                        count--;
                    }
                }
            }
        }
    );

    chrome.runtime.sendMessage({type: "CHAT"});
})();