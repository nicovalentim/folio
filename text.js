let idiomaAtual = "en";

const traducoes = {
    en: {
        navContato: "contact",
        navHome: "home",
        navProjetos: "projects",
        navSobre: "about",

        homeSubtitulo: "section subtitle",
        homeTitulo: 'A lorem ipsum text that <span class="marcado">I want</span> to use as a title.',
        homeDescricao: "A lorem ipsum text that I want to use as a subtitle",

        carregando: "loading projects...",
        semProjetos: "No projects found.",
        erroProjetos: "Could not load projects.",
        gitLink: "view project on github",
        semDescricao: "No description.",

        imgSobre: "imagens/about_en.gif",

        contatoTitulo: 'say <br /><span class="marcado">hello</span>!',
        labelNome: "Name",
        placeholderNome: "Type your name",
        labelAssunto: "Subject",
        placeholderAssunto: "Type the subject",
        labelMensagem: "Message",
        placeholderMensagem: "Type your message here",
        btnEnviar: "Send",
        emailSucesso: "Your email app was opened!"
    },
    pt: {
        navContato: "contato",
        navHome: "home",
        navProjetos: "projetos",
        navSobre: "sobre",

        homeSubtitulo: "subtítulo da seção",
        homeTitulo: 'Um texto de lorem ipsum que <span class="marcado">eu quero</span> usar de título.',
        homeDescricao: "Um texto de lorem ipsum que eu quero usar de subtítulo",

        carregando: "carregando projetos...",
        semProjetos: "Nenhum projeto encontrado.",
        erroProjetos: "Não foi possível carregar os projetos.",
        gitLink: "ver projeto no github",
        semDescricao: "Sem descrição.",
        
        imgSobre: "imagens/about_pt.gif",

        contatoTitulo: 'me manda <br /><span class="marcado">um alô</span>!',
        labelNome: "Nome",
        placeholderNome: "Digite seu nome",
        labelAssunto: "Assunto",
        placeholderAssunto: "Digite o assunto",
        labelMensagem: "Mensagem",
        placeholderMensagem: "Digite sua mensagem aqui",
        btnEnviar: "Enviar",
        emailSucesso: "Seu aplicativo de e-mail foi aberto!"
    }
};

function extrairDescricao(texto, lang) {
    if (!texto) return traducoes[lang].semDescricao;
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
}

function atualizarInterface() {
    document.getElementById("btnIdioma").textContent = idiomaAtual === "pt" ? "EN/US" : "PT/BR";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const chave = el.getAttribute("data-i18n");
        if (traducoes[idiomaAtual][chave]) el.innerHTML = traducoes[idiomaAtual][chave];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const chave = el.getAttribute("data-i18n-placeholder");
        if (traducoes[idiomaAtual][chave]) el.placeholder = traducoes[idiomaAtual][chave];
    });

    document.querySelectorAll("[data-i18n-src]").forEach((el) => {
        const chave = el.getAttribute("data-i18n-src");
        if (traducoes[idiomaAtual][chave]) el.src = traducoes[idiomaAtual][chave];
    });

    if (typeof projetos !== "undefined" && projetos.length > 0) {
        criarProjetos();
        mostrarProjeto(indiceAtual);
    }
}

function alternarIdioma() {
    idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
    atualizarInterface();
}

document.getElementById("btnIdioma").addEventListener("click", alternarIdioma);

document.addEventListener("DOMContentLoaded", () => {
    atualizarInterface();
});