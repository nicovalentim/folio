// botão que aparece na página e executa a funça  (ebook)
const botao = document.querySelector("#verMais");

// lugar aonde os posts vão aparecer (ebook)
const posts = document.querySelector("#posts");

// lista de posts em html separado pq preguiça refazer a página toda vez no futuro
const arquivos = [
	"frontpage/post1.html",
	"frontpage/post2.html"
];

// variáveis/constantes pra função rodar
let contador = 0;
// ebook também, evento pra reagir ao clique
botao.addEventListener("click", carregar);

// função de carregar arquivo em sequência
function carregar() {

	// adicionar próximo arquivo
	const resposta = fetch(arquivos[contador]);
	const conteudo = resposta.text();
	posts.innerHTML += conteudo;

	// subir o contador pro botão sumir
	contador++
	}

	// tentando fazer o botão sumir quando não tem mais arquivos
	if (contador >= arquivos.length) {
		botao.style.display = "none";
	}
	else {
		botao.textContent = "+";
	}
