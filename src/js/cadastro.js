firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', sendData);

function sendData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    // Certifique-se de que a senha atende aos requisitos do Firebase (mínimo 6 caracteres, por exemplo).
    if (password.length < 6) {
        alert('A senha deve conter pelo menos 6 caracteres.');
        return;
    }

    const usersRef = database.ref('usuarios');
    const newUser = {
        'name': name,
        'email': email,
        'password': password,
    };

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // O usuário foi criado com sucesso. Você pode adicionar informações adicionais ao banco de dados aqui.
            usersRef.push(newUser); // ou use .set se preferir
            // Limpe os campos após o cadastro bem-sucedido
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
            alert('Cadastro criado com sucesso!');
        })
        .catch((error) => {
            // Lida com erros de autenticação
            alert('Erro ao criar a conta: ' + error.message);
        });
}
