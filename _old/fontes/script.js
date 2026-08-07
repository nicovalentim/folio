// função de mudar a cor do título da página
// eu fiz isso em outro arquivo antes, pra tentar resolver o problema de clicar um botão fazer carregar variáveis ao invés de constantes
 
const tituloCor = document.querySelector("#title");
const cores =  ["cyan", "magenta", "yellow", "#3e2718"]
let contadorCores = 0

tituloCor.addEventListener("click", () => {
	// muda a cor na ordem da lista
    tituloCor.style.color = cores[contadorCores];
	contadorCores++

	// se o contador de cores passar do limite de cores possíveis
	if (contadorCores >= cores.length) {
		contadorCores = 0;
	}
});

// ------------------------------------------------------
// função de carregar novos posts

// botão que aparece na página e executa a funça  (ebook)
const mais = document.querySelector("#verMais");

// lugar aonde os posts vão aparecer (ebook)
const posts = document.querySelector("#posts");

// lista de posts em html separado pq preguiça refazer a página toda vez no futuro
const arquivos = [
	"frontpage/post1.html",
	"frontpage/post2.html"
];

// variáveis/constantes pra função rodar
// contador de "quantos posts já foram chamados pela função"
let contadorPosts = 0;
// ebook também, evento pra reagir ao clique
mais.addEventListener("click", carregar);

// função de carregar arquivo em sequência
async function carregar() {
	// entrada do próximo arquivo
	const response = await fetch(arquivos[contadorPosts]);
	// processar arqvuivo (pegar o texto dentro dele)
	const conteudo = await response.text();
	
	// retornar o conteúdo na página
	posts.innerHTML += conteudo;

	// subir o contador
	contadorPosts++

	// função para fazer o botão sumir em caso de não haver mais arquivos
	if (contadorPosts >= arquivos.length) {
		mais.style.display = 'none';
		posts.innerHTML += "Não há mais posts.";
	}

}
