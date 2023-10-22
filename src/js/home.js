function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html";
    }).catch(() => {
        alert('Erro ao fazer logout');
    })
}

function getCookie(nome) {
    var cookies = document.cookie.split(';'); 
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim(); 
        if (cookie.indexOf(nome + '=') === 0) {
            return cookie.substring(nome.length + 1, cookie.length);
        }
    }
    return null;
}
// Supondo que você já configurou o Firebase no seu projeto

// Obtém a instância do Firebase Storage
var storage = firebase.storage();

// Referência ao banco de dados
var database = firebase.database();
var postsRef = database.ref("posts");

// Função para carregar e exibir os dados
// ...

function carregarDados() {
    postsRef.once("value").then(function (snapshot) {
        var posts = snapshot.val();
        var postContainer = document.getElementById("post-container");

        for (var postId in posts) {
            var post = posts[postId];
            var postElement = document.createElement("div");
            postElement.className = "post";

            var postTitle = document.createElement("h2");
            postTitle.textContent = post.titulo;

            var postDescricao = document.createElement("p");
            postDescricao.textContent = post.descricao;

            var postCidade = document.createElement("p");
            postCidade.textContent = "Cidade: " + post.cidade;

            var postHora = document.createElement("p");
            postHora.textContent = "Hora: " + post.hora;

            // Função para carregar a imagem do Firebase Storage e adicionar ao elemento após o carregamento
            function loadImage() {
                var imageRef = storage.ref("imagens/" + postId + "/PCB - Modulo.png");
                imageRef.getDownloadURL().then(function (url) {
                    var postImage = document.createElement("img");
                    postImage.src = url;
                    postElement.appendChild(postImage);
                });
            }

            // Chame a função para carregar a imagem
            loadImage();

            postElement.appendChild(postTitle);
            postElement.appendChild(postDescricao);
            postElement.appendChild(postCidade);
            postElement.appendChild(postHora);

            postContainer.appendChild(postElement);
        }
    });
}


// Chame a função para carregar os dados quando a página carregar
window.addEventListener("load", carregarDados);
