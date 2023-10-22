

const database = app.database();
const postsRef = database.ref('posts');

// Referência ao Firebase Storage
const storage = getStorage(app);

// Manipular o envio do formulário
const form = document.getElementById('post-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const cidade = document.getElementById('cidade').value;
    const hora = document.getElementById('hora').value;
    const descricao = document.getElementById('descricao').value;
    const imagensInput = document.getElementById('imagens');

    // Realizar upload das imagens para o Firebase Storage
    const imagensFiles = imagensInput.files;
    const imagensUrls = [];

    for (let i = 0; i < imagensFiles.length; i++) {
        const imagemFile = imagensFiles[i];
        const imagemRef = ref(storage, 'imagens/' + imagemFile.name);

        await uploadBytes(imagemRef, imagemFile).then(async (snapshot) => {
            // Obter a URL da imagem após o upload
            const url = await getDownloadURL(imagemRef);
            imagensUrls.push(url);

            // Verificar se todas as imagens foram processadas
            if (imagensUrls.length === imagensFiles.length) {
                // Salvar os dados, incluindo as URLs das imagens, no Firebase Realtime Database
                postsRef.push({
                    titulo: titulo,
                    cidade: cidade,
                    hora: hora,
                    descricao: descricao,
                    imagens: imagensUrls
                });

                // Limpar o formulário após o envio
                form.reset();
            }
        });
    }
});