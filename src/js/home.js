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

// Função para criar uma linha divisória
function criarLinhaDivisoria() {
    var linhaDivisoria = document.createElement("hr");
    linhaDivisoria.className = "post-divider";
    return linhaDivisoria;
}


// Função para carregar e exibir os dados
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

            var postImage = document.createElement("img");
            postImage.src = post.imagens[0];

            postImage.style.width = "25%";
            postImage.style.height = "auto";

            postElement.appendChild(postTitle);
            postElement.appendChild(postDescricao);
            postElement.appendChild(postCidade);
            postElement.appendChild(postHora);
            postElement.appendChild(postImage);

            // Adicione a linha divisória após cada post
            postContainer.appendChild(postElement);
            postContainer.appendChild(criarLinhaDivisoria());
        }
    });
}


// Chame a função para carregar os dados quando a página carregar
window.addEventListener("load", carregarDados);
