// Firebase Realtime Database
const database = firebase.database();
const postsRef = database.ref('posts');

// Firebase Storage
const storage = firebase.storage();

// Manipular o envio do formulário
document.addEventListener("DOMContentLoaded", function() {
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

        const promises = [];

        for (let i = 0; i < imagensFiles.length; i++) {
            const imagemFile = imagensFiles[i];
            const imagemRef = storage.ref('imagens/' + imagemFile.name);

            const uploadTask = imagemRef.put(imagemFile);

            // Capturar a URL da imagem após o upload
            const urlPromise = new Promise((resolve, reject) => {
                uploadTask.on('state_changed', null, null, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        imagensUrls.push(downloadURL);

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
                        resolve();
                    });
                });
            });

            promises.push(urlPromise);
        }

        Promise.all(promises).then(() => {
            // Todas as URLs foram obtidas
        });
    });
});
