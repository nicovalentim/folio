const botao = document.querySelector("#verMais");
const posts = document.querySelector("#posts");

botao.addEventListener("click", carregar);

async function carregar() {
	const response = await fetch("posts.html");
	const html = await response.text();
	posts.innerHTML = html;
	bota.style.display = "none";
}
