let idiomaAtual = "en";

const traducoes = {
    en: {
        navContato: "contact",
        navHome: "home",
        navProjetos: "projects",
        navSobre: "about",

        homeSubtitulo: "Lorem ipsum",
        homeTitulo: 'Lorem ipsum dolor <span class="marcado">sit amet</span>.',
        homeDescricao: "Maecenas sed erat at est condimentum elementum vel quis nulla. Sed interdum lacinia est, vel consectetur turpis aliquet eu.",

        carregando: "loading projects...",
        semProjetos: "No projects found.",
        erroProjetos: "Could not load projects.",
        gitLink: "view project on github",
        semDescricao: "No description.",

        imgSobre: "imagens/about_en.gif",

        contatoTitulo: 'tell me <br /><span class="marcado">something</span><br />new!',
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
    },
    ja: {
        navContato: "お問い合わせ",
        navHome: "ホーム",
        navProjetos: "プロジェクト",
        navSobre: "概要",

        homeSubtitulo: "サブタイトル",
        homeTitulo: 'ここに<span class="marcado">タイトル</span>が入ります。',
        homeDescricao: "ここに説明文が入ります。",

        carregando: "読み込み中...",
        semProjetos: "プロジェクトが見つかりません。",
        erroProjetos: "プロジェクトの読み込みに失敗しました。",
        gitLink: "GitHubで見る",
        semDescricao: "説明なし。",
        
        imgSobre: "imagens/about_ja.gif",

        contatoTitulo: '何かを<br /><span class="marcado">伝えて</span>！',
        labelNome: "お名前",
        placeholderNome: "お名前を入力してください",
        labelAssunto: "件名",
        placeholderAssunto: "件名を入力してください",
        labelMensagem: "メッセージ",
        placeholderMensagem: "メッセージを入力してください",
        btnEnviar: "送信",
        emailSucesso: "メールアプリが開きました！"
    }
};

function extrairDescricao(texto, lang) {
    if (!texto) return traducoes[lang].semDescricao;
    
    const regex = /\[PT\]([\s\S]*?)(?=\[EN\]|\[JP\]|$)|\[EN\]([\s\S]*?)(?=\[PT\]|\[JP\]|$)|\[JP\]([\s\S]*?)(?=\[PT\]|\[EN\]|$)/gi;
    let descPT = "", descEN = "", descJA = "";
    let match;

    while ((match = regex.exec(texto)) !== null) {
        if (match[1]) descPT += match[1].trim() + " ";
        if (match[2]) descEN += match[2].trim() + " ";
        if (match[3]) descJA += match[3].trim() + " ";
    }

    if (lang === "pt" && descPT) return descPT.trim();
    if (lang === "en" && descEN) return descEN.trim();
    if (lang === "ja" && descJA) return descJA.trim();

    return texto;
}

function atualizarInterface() {
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

function mudarIdioma(lang) {
    idiomaAtual = lang;
    atualizarInterface();
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarInterface();

    document.querySelectorAll(".btn-lang").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const lang = e.target.getAttribute("data-lang");
            if (lang) mudarIdioma(lang);
        });
    });
});