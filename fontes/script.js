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
// contador de "quantos posts já foram chamados pela função"
let contador = 0;
// ebook também, evento pra reagir ao clique
botao.addEventListener("click", carregar);

// função de carregar arquivo em sequência
async function carregar() {

	// entrada do próximo arquivo
	const response = await fetch(arquivos[contador]);
	// processar arqvuivo (pegar o texto dentro dele)
	const conteudo = await response.text();
	
	// retornar o conteúdo na página
	posts.innerHTML += conteudo;

		// parte extra da função pra fazer o botão sumir
		// subir o contador
		contador++
}

		// se o contador de quantos já foram passar de quantos arquivos existem, faz o botão sumir da tela
		if (contador >= arquivos.length) {
			botao.style.display = "none";
			return;
		}



