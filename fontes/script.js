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

	// fazer o botão sumir caso n tenha mais arquivos pra carregar (pfv que funcione dessa vez)
	if (contador >=arquivos.length) {
		botao.style.display = "none";
		return
	}

	// adicionar próximo arquivo
	const resposta = fetch(arquivos[contador]);
	const conteudo = resposta.text();
	posts.innerHTML += conteudo;

	// subir o contador pro botão sumir
	contador++
	}

	// maldito botão, some logo
	if (contador >=arquivos.length) {
		botao.style.display = "none";
	}
	else {
		botao.disabled = false;
		botao.textContent = "+";
	}
