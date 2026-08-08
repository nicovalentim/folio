// barra de navegação
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const navRect = nav.getBoundingClientRect();
  
  const elements = document.elementsFromPoint(
    navRect.left + navRect.width / 2,
    navRect.top + navRect.height / 2
  );

  const currentSection = elements.find((el) => el.tagName === "SECTION");
    if (currentSection) {
        const color = currentSection.getAttribute("data-nav-color") || "black";
        nav.style.color = color;
    }
});

// traduções
let idiomaAtual = "pt";

const traducoes = {
    pt: {
        navHome: "home",
        navSobre: "sobre",
        navProjetos: "projetos",
        navContato: "contato",
        homeSubtitle: "subtítulo da seção",
        homeTitle: 'Um texto de lorem ipsum que <span class="marcado">eu quero</span> usar de título.',
        homeDescription: "Um texto de lorem ipsum que eu quero usar de subtítulo",
        loading: "carregando projetos...",
        noProjects: "Nenhum projeto encontrado.",
        errorProjects: "Não foi possível carregar os projetos.",
        gitLink: "ver projeto no github",
        noDescription: "Sem descrição.",
        contactTitle: 'me manda <br /><span class="marcado">um alô</span>!',
        labelNome: "Nome",
        placeholderNome: "Digite seu nome",
        labelAssunto: "Assunto",
        placeholderAssunto: "Digite o assunto",
        labelMensagem: "Mensagem",
        placeholderMensagem: "Digite sua mensagem aqui",
        btnEnviar: "Enviar",
        emailSucesso: "Seu aplicativo de e-mail foi aberto!"
    },
    en: {
        navHome: "home",
        navSobre: "about",
        navProjetos: "projects",
        navContato: "contact",
        homeSubtitle: "section subtitle",
        homeTitle: 'A lorem ipsum text that <span class="marcado">I want</span> to use as a title.',
        homeDescription: "A lorem ipsum text that I want to use as a subtitle",
        loading: "loading projects...",
        noProjects: "No projects found.",
        errorProjects: "Could not load projects.",
        gitLink: "view project on github",
        noDescription: "No description.",
        contactTitle: 'say <br /><span class="marcado">hello</span>!',
        labelNome: "Name",
        placeholderNome: "Type your name",
        labelAssunto: "Subject",
        placeholderAssunto: "Type the subject",
        labelMensagem: "Message",
        placeholderMensagem: "Type your message here",
        btnEnviar: "Send",
        emailSucesso: "Your email app was opened!"
    }
};

function extrairDescricao(texto, lang) {
    if (!texto) return traducoes[lang].noDescription;
    
    const regex = /\[PT\]([\s\S]*?)(?=\[EN\]|$)|\[EN\]([\s\S]*?)(?=\[PT\]|$)/gi;
    let descPT = "";
    let descEN = "";
    let match;

    while ((match = regex.exec(texto)) !== null) {
        if (match[1]) descPT += match[1].trim() + " ";
        if (match[2]) descEN += match[2].trim() + " ";
    }

    if (lang === "pt" && descPT) return descPT.trim();
    if (lang === "en" && descEN) return descEN.trim();

    // Caso não encontre as tags [PT] ou [EN], retorna o texto original completo
    return texto;
}

function alternarIdioma() {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    document.getElementById("btnIdioma").textContent = idiomaAtual === "pt" ? "EN" : "PT";

    // Atualiza elementos estáticos
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const chave = el.getAttribute("data-i18n");
        if (traducoes[idiomaAtual][chave]) {
            el.innerHTML = traducoes[idiomaAtual][chave];
        }
    });

    // Atualiza placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const chave = el.getAttribute("data-i18n-placeholder");
        if (traducoes[idiomaAtual][chave]) {
            el.placeholder = traducoes[idiomaAtual][chave];
        }
    });

    // Reconstruir lista de projetos com o novo idioma
    if (projetos.length > 0) {
        criarProjetos();
        mostrarProjeto(indiceAtual);
    }
}

document.getElementById("btnIdioma").addEventListener("click", alternarIdioma);

// contato
function enviarEmail() {
    const form = document.getElementById('contato');
    if (!form) {
        console.error("Formulário de contato não encontrado!");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.querySelector('input[name="contatoNome"]').value;
        const assuntoSemFiltro = document.querySelector('input[name="contatoAssunto"]').value;
            const assunto = encodeURIComponent(assuntoSemFiltro);
        const mensagemSemFiltro = document.querySelector('textarea[name="contatoMensagem"]').value;
            const mensagem = encodeURIComponent(mensagemSemFiltro);
        const sucesso = document.getElementById("contatoSucesso");

        const destinatario = "nico_porfolio@outlook.com";
        const corpoEmail = `Enviada por: ${nome}\n\nMensagem:\n${mensagem}`;
        const mailtoLink = `mailto:${destinatario}?subject=${assunto}&body=${corpoEmail}`;

        window.location.href = mailtoLink;

        if (sucesso) sucesso.innerHTML = traducoes[idiomaAtual].emailSucesso;
        form.reset();
    });
}

enviarEmail();

// indicadores (para a busca)
const PORTFOLIO_TOPIC = "folio";
const PREVIEW_FILE = "preview.jpg";
const projetosContainer = document.getElementById("projetosContainer");
    let projetos = [];
    let indiceAtual = 0;

// buscar repos
async function carregarProjetos() {
    try {
        const resposta = await fetch(`https://api.github.com/users/nicovalentim/repos?per_page=100&sort=updated`);
            if (!resposta.ok) throw new Error(`GitHub API retornou ${resposta.status}`);

        const repositorios = await resposta.json();
            projetos = repositorios.filter((repo) =>
                Array.isArray(repo.topics) &&
                repo.topics.includes(PORTFOLIO_TOPIC)
            );
            if (projetos.length === 0) {
                projetosContainer.innerHTML = `<p>${traducoes[idiomaAtual].noProjects}</p>`;
                btnAnterior.style.display = "none";
                btnProximo.style.display = "none";
                return;
            }
        criarProjetos();
        mostrarProjeto(0);
    } catch (erro) {
        console.error("Erro ao carregar projetos:", erro);
        projetosContainer.innerHTML = `<p>${traducoes[idiomaAtual].errorProjects}</p>`;
        btnAnterior.style.display = "none";
        btnProximo.style.display = "none";
    }
}

// cards
function criarProjetos() {
    projetosContainer.innerHTML = "";

    projetos.forEach((projeto, index) => {
        const elemento = document.createElement("div");
            elemento.classList.add("exemplo");
            elemento.id = `projeto_${index}`;

        const imagem =
            `https://raw.githubusercontent.com/nicovalentim/` +
            `${encodeURIComponent(projeto.name)}/` +
            `${encodeURIComponent(projeto.default_branch)}/` +
            `${PREVIEW_FILE}`;

        const descricaoTradução = extrairDescricao(projeto.description, idiomaAtual);

        elemento.innerHTML = `
<div>
    <img
        src="${imagem}"
        alt="${projeto.name}"
        onerror="this.onerror=null; this.src='imagens/_exemplo.jpg';"
    />

    <span>
        <h2>${projeto.name}</h2>
        <h1>${descricaoTradução}</h1>

        <p>
            <a
                class = "linkToGit"
                href="${projeto.html_url}"
                target="_blank"
                rel="noopener noreferrer"
            >
                ${traducoes[idiomaAtual].gitLink}
            </a>
        </p>
    </span>
</div>
        `;

        projetosContainer.appendChild(elemento);
    });
}

// carrossel
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

carregarProjetos();