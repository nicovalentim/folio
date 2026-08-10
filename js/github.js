import { extrairDescricao, traducoes, idiomaAtual } from "./text.js";
import { outros } from './outros.js';

const PORTFOLIO_TOPIC = "folio";
const PREVIEW_FILE = "preview.jpg";
const projetosContainer = document.getElementById("projetosContainer");
    let projetos = [];
    let indiceAtual = 0;

export async function carregarProjetos() {
    try {
        const resposta = await fetch(`https://api.github.com/users/nicovalentim/repos?per_page=100&sort=updated`);
        
        let reposGithub = [];
        if (resposta.ok) {
            const repositorios = await resposta.json();
            reposGithub = repositorios.filter((repo) =>
                Array.isArray(repo.topics) &&
                repo.topics.includes(PORTFOLIO_TOPIC)
            );
        }
        projetos = [...reposGithub, ...outros];

        if (projetos.length === 0) {
            projetosContainer.innerHTML = `<p>${traducoes[idiomaAtual].semProjetos}</p>`;
            btnAnterior.style.display = "none";
            btnProximo.style.display = "none";
            return;
        }

        criarProjetos();
        mostrarProjeto(0);

    } catch (erro) {
        console.error("Erro ao carregar projetos:", erro);
        projetos = [...outros];
        if (projetos.length > 0) {
            criarProjetos();
            mostrarProjeto(0);
        } else {
            projetosContainer.innerHTML = `<p>${traducoes[idiomaAtual].erroProjetos}</p>`;
            btnAnterior.style.display = "none";
            btnProximo.style.display = "none";
        }
    }
}

function criarProjetos() {
    projetosContainer.innerHTML = "";

    projetos.forEach((projeto, index) => {
        const elemento = document.createElement("div");
        elemento.classList.add("exemplo");
        elemento.id = `projeto_${index}`;

        const imagem = projeto.imagemCustomizada 
            ? projeto.imagemCustomizada 
            : `https://raw.githubusercontent.com/nicovalentim/${encodeURIComponent(projeto.name)}/${encodeURIComponent(projeto.default_branch)}/${PREVIEW_FILE}`;

        const descricaoTraducao = extrairDescricao(projeto.description, idiomaAtual);

        let rotuloLink = traducoes[idiomaAtual].gitLink;
        if (projeto.textoLink && projeto.textoLink[idiomaAtual]) {
            rotuloLink = projeto.textoLink[idiomaAtual];
        }

        elemento.innerHTML = `
<div>
    <img
        src="${imagem}"
        alt="${projeto.name}"
        onerror="this.onerror=null; this.src='./imagens/padrao.jpg';"
    />

    <span>
        <h2>${projeto.name}</h2>
        <h1>${descricaoTraducao}</h1>

        <p>
            <a
                class="linkAoProjeto"
                href="${projeto.html_url}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${rotuloLink}
            </a>
        </p>
    </span>
</div>
        `;

        projetosContainer.appendChild(elemento);
    });
}

window.rerenderizarProjetos = () => {
    if (typeof projetos !== "undefined" && projetos.length > 0) {
        criarProjetos();
        mostrarProjeto(indiceAtual);
    }
};

function mostrarProjeto(index) {
    const elementos = projetosContainer.querySelectorAll(".exemplo");
        elementos.forEach((projeto) => {
            projeto.style.display = "none";
        });

    if (elementos[index]) elementos[index].style.display = "block";
}

const btnAnterior = document.getElementById("btnAnterior");
const btnProximo = document.getElementById("btnProximo");
    btnProximo.addEventListener("click", () => {
        if (projetos.length === 0) return;
        indiceAtual = (indiceAtual + 1) % projetos.length;
        mostrarProjeto(indiceAtual);
    });
    btnAnterior.addEventListener("click", () => {
        if (projetos.length === 0) return;
        indiceAtual = (indiceAtual - 1 + projetos.length) % projetos.length;
        mostrarProjeto(indiceAtual);
    });