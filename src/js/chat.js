document.addEventListener("DOMContentLoaded", function () {
    const db = firebase.database();
    const auth = firebase.auth();

    const conversationsRef = db.ref("conversations");
    const messagesRef = db.ref("messages");
    const usersRef = db.ref("users");

    let currentUser;

    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            const emailDoUsuarioLogado = currentUser.email;
            console.log("Usuário logado com o email:", emailDoUsuarioLogado);
            initChat();
        } else {
            // Implemente a lógica de autenticação aqui (login, registro, etc.).
        }
    });

    function initChat() {
        const conversationsList = document.getElementById("conversations");
        const userList = document.getElementById("userList");
        const createConversationButton = document.getElementById("createConversationButton");
        const messageList = document.getElementById("messageList");
        const messageInput = document.getElementById("messageInput");
        const sendButton = document.getElementById("sendButton");

        conversationsRef.on("value", (snapshot) => {
            conversationsList.innerHTML = "";
            snapshot.forEach((conversationSnapshot) => {
                const conversation = conversationSnapshot.val();
                const conversationItem = document.createElement("li");
                conversationItem.textContent = conversation.name;
                conversationItem.addEventListener("click", () => {
                    loadMessages(conversationSnapshot.key);
                });
                conversationsList.appendChild(conversationItem);
            });
        });

        usersRef.on("value", (snapshot) => {
            userList.innerHTML = "";
            snapshot.forEach((userSnapshot) => {
                const user = userSnapshot.val();
                if (user.email !== currentUser.email) {
                    const userItem = document.createElement("li");
                    userItem.textContent = user.email;
                    userItem.addEventListener("click", () => {
                        createConversation(user.email);
                    });
                    userList.appendChild(userItem);
                }
            });
        });

        createConversationButton.addEventListener("click", () => {
            const conversationName = prompt("Digite o nome da conversa:");
            if (conversationName) {
                createConversation(conversationName);
            }
        });

        let selectedConversationId = null;

        function loadMessages(conversationId) {
            selectedConversationId = conversationId;
            messageList.innerHTML = "";
            messagesRef.child(conversationId).on("child_added", (snapshot) => {
                const message = snapshot.val();
                const messageElement = document.createElement("div");
                messageElement.innerText = `${message.sender}: ${message.text}`;
                messageList.appendChild(messageElement);
            });
        }

        function createConversation(conversationName) {
            const newConversationRef = conversationsRef.push();
            const conversationId = newConversationRef.key;
            newConversationRef.set({ name: conversationName });
            loadMessages(conversationId);
        }

        sendButton.addEventListener("click", () => {
            const messageText = messageInput.value.trim();
            if (messageText && selectedConversationId) {
                const message = {
                    text: messageText,
                    sender: currentUser.email,
                };
                messagesRef.child(selectedConversationId).push(message);
                messageInput.value = "";
            }
        });
    }
});
