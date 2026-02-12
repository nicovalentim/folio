// botão que aparece na página e executa a funça
const botao = document.querySelector("#verMais");

// lugar aonde os posts vão aparecer
const posts = document.querySelector("#posts");

// lista de posts em html separado pq preguiça refazer a página toda vez no futuro
const arquivos = [
	"frontpage/post1.html",
	"frontpage/post2.html"
];

// variáveis/constantes pra função rodar
let contador = 0;
botao.addEventListener("click", carregar);

async function carregar() {

	// fazer o botão sumir caso n tenha mais arquivos pra carregar (pfv que funcione dessa vez)
	if (contador >=arquivos.length) {
		botao.style.display = "none";
		return
	}


	botao.disabled = true
	botao.textContent = "...";

	// adicionar próximo arquivo
	const response = await fetch("frontpage/posts.html");
	const html = await response.text();
	posts.innerHTML += html;

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
