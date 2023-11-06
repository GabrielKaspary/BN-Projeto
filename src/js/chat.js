document.addEventListener("DOMContentLoaded", function() {
    // Função para obter o usuário logado
    function getCurrentUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                unsubscribe();
                resolve(user);
            }, reject);
        });
    }

    // Função para listar os usuários do Realtime Database
    function listUsers() {
        const usersRef = firebase.database().ref('usuarios');

        return usersRef.once('value')
            .then(snapshot => {
                const userList = [];
                snapshot.forEach(childSnapshot => {
                    const user = childSnapshot.val();
                    userList.push(user);
                });
                return userList;
            });
    }

    // Função para atualizar a coluna lateral com a lista de usuários
    function updateSidebar(userList) {
        const userListElement = document.getElementById('userList');
        userListElement.innerHTML = '';

        userList.forEach(user => {
            const userItem = document.createElement('li');
            userItem.textContent = user.name || user.email || user.uid;
            userItem.addEventListener('click', () => {
                // Implemente a lógica para iniciar uma conversa com o usuário clicado
                console.log(`Iniciar conversa com ${userItem.textContent}`);
            });
            userListElement.appendChild(userItem);
        });
    }

    // Função para enviar uma mensagem
    function sendMessage(user1, user2, messageText) {
        const conversationId = `${user1}_${user2}`;
        const messagesRef = firebase.database().ref('usuarios/' + conversationId);

        const message = {
            text: messageText,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            sender: user1,
        };

        messagesRef.push(message);
    }

    // Função para ouvir novas mensagens
    function listenForNewMessages(user1, user2) {
        const conversationId = `${user1}_${user2}`;
        const messagesRef = firebase.database().ref('usuarios/' + conversationId);

        messagesRef.on('child_added', (snapshot) => {
            const message = snapshot.val();
            const messageElement = document.createElement('div');
            messageElement.innerText = `${message.sender}: ${message.text}`;
            document.getElementById('messages').appendChild(messageElement);
        });
    }

    // Chame a função para listar os usuários e, quando os usuários forem obtidos, atualize a coluna lateral
    getCurrentUser()
        .then(user => {
            if (user) {
                console.log('Usuário logado:', user.email);
                const user1 = user.uid;
                const user2 = 'outro_usuario';

                return listUsers()
                    .then(userList => {
                        if (userList) {
                            updateSidebar(userList);
                            listenForNewMessages(user1, user2);
                            const sendButton = document.getElementById('sendButton');
                            const messageInput = document.getElementById('messageInput');

                            sendButton.addEventListener('click', () => {
                                const messageText = messageInput.value.trim();
                                if (messageText) {
                                    sendMessage(user1, user2, messageText);
                                    messageInput.value = '';
                                }
                            });

                            messageInput.addEventListener('keypress', (e) => {
                                if (e.key === 'Enter') {
                                    const messageText = messageInput.value.trim();
                                    if (messageText) {
                                        sendMessage(user1, user2, messageText);
                                        messageInput.value = '';
                                    }
                                }
                            });
                        }
                    });
            } else {
                console.log('Nenhum usuário logado');
                return null;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
