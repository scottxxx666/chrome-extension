(async () => {
    let chat;
    const body = document.querySelector('body');
    let chatWindow;

    chrome.runtime.onMessage.addListener(messageListener);

    function removeChat() {
        if (chatWindow) chatWindow.remove();
    }

    function createChat() {
        chatWindow = document.createElement('div');
        chatWindow.id = 'ptt-chat-window';

        const header = document.createElement('div');
        header.id = 'ptt-chat-header';
        const transparentBtn = document.createElement('button')
        transparentBtn.addEventListener('click', handleTransparent)
        transparentBtn.textContent = '透明'
        header.appendChild(transparentBtn);
        chatWindow.appendChild(header);

        const chatContainer = document.createElement('div');
        chatContainer.id = 'ptt-chat-container';
        chatWindow.appendChild(chatContainer);

        chat = document.createElement('div');
        chat.id = 'ptt-chat';
        chatContainer.appendChild(chat)

        const footer = document.createElement('div');
        footer.id = 'ptt-chat-footer';
        const input = document.createElement('input');
        footer.id = 'push-message';
        footer.appendChild(input);
        chatWindow.appendChild(footer);

        body.appendChild(chatWindow);
    }

    function messageListener(request, sender, sendResponse) {
        console.log(request)
        const {type, data} = request;
        if (type === 'START') {
            createChat();
        } else if (type === 'MSG') {
            const msgs = JSON.parse(data);
            const frag = document.createDocumentFragment();
            for (let i = msgs.length - 1; i >= 0; i--) {
                const m = msgs[i]
                const div = document.createElement('div');
                const user = document.createElement('span');
                user.classList.add('account');
                user.textContent = `${m.user}：`;
                div.appendChild(user);
                const message = document.createElement('span');
                message.classList.add('message');
                message.textContent = m.message;
                div.appendChild(message)
                frag.appendChild(div)
                chat.appendChild(frag)

                chat.lastElementChild.scrollIntoView({block: 'nearest', inline: 'nearest'})
            }
            const msgCount = chat.childElementCount
            for (let j = msgCount; j > 100; j--) {
                chat.removeChild(chat.firstChild);
            }
        } else if (type === 'STOP') {
            chrome.runtime.onMessage.removeListener(messageListener)
            removeChat();
        } else {
            console.log(type, data)
        }
    }

    function handleTransparent() {
        chatWindow.classList.toggle('transparent')
    }
})();