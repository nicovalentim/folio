export let idiomaAtual = "en";

export const traducoes = {
    en: {
        navContato: "contact",
        navHome: "home",
        navProjetos: "projects",
        navSobre: "about me",

        homeSubtitulo: "Oh, And in case I don't see ya: good afternoon, good evening, and good night!",
        homeTitulo: `
            'ello, i'm <span class="marcado">Nico</span>!<br />
            I'm a full-stack web dev<br />
            and a UX designer.
            `,
        homeDescricao: `
            Passionate about building cool things and learning new tech.<br />
            Explore my work below!
        `,
        cv: "get my CV",
        btnContato: "contact me",
        ou: "or just",

        carregando: "loading projects...",
        semProjetos: "No projects found.",
        erroProjetos: "Could not load projects.",
        gitLink: "view project on github",
        semDescricao: "No description.",

        filosofiaTitulo: "approach",
        filosofiaTexto: `
            textão sobre o que bodegas eu tenho como filosofia, não sei o que escrever agora aaaaaaaaaaaa
        `,
        jornadaTitulo: "background",
        jornadaTexto: `
            texto sobre quem eu sou, de onde eu vim etc
        `,
        habilidatesTitulo: "core strengths",
        habilidadesTexto: `
            <li>
                ab
            </li><li>
                cd
            </li><li>
                ef
            </li><li>
                gh
            </li><li>
                ij
            </li><li>
                kl
            </li>
        `,
        aprendendoTitulo: "what I'm learning",
        aprendendoTexto: `
            qq eu to estudando mano
        `,
        hobbiesTitulo: "beyond coding",
        hobbiesTexto: `
            texto grande sobre hobbies
        `,

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
        navSobre: "sobre eu",

        homeSubtitulo: "Pra que amanhã não seja só um ontem com um novo nome",
        homeTitulo: `
            Opa, eu sou o <span class="marcado">Nico</span>!<br />
            Sou um web dev full-stack<br />
            e designer UX.
            `,
        homeDescricao: `
            Apaixonado por criar coisas legais e aprender tecnologias novas.<br />
            Dá uma olhada no meu trabalho logo abaixo!
        `,
        cv: "veja meu CV",
        btnContato: "me manda uma mensagem",
        ou: "ou só",

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
        navSobre: "私について",

        homeSubtitulo: "人の夢は終わらねェ!",
        homeTitulo: `
            よ、<span class="marcado">ニコ</span>です！!<br />
            フルスタックWebエンジニア<br />
            とUXデザイナーやってます。
            `,
        homeDescricao: `
            面白いものを作ることと、新しい技術を学ぶのが大好き。<br />
            ぜひ作品を見ていってね！
        `,
        cv: "CVを見る",
        btnContato: "連絡する",
        ou: "それとも",

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

export function extrairDescricao(texto, lang) {
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
        if (traducoes[idiomaAtual] && traducoes[idiomaAtual][chave]) el.innerHTML = traducoes[idiomaAtual][chave];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const chave = el.getAttribute("data-i18n-placeholder");
        if (traducoes[idiomaAtual] && traducoes[idiomaAtual][chave]) el.placeholder = traducoes[idiomaAtual][chave];
    });
    document.querySelectorAll("[data-i18n-src]").forEach((el) => {
        const chave = el.getAttribute("data-i18n-src");
        if (traducoes[idiomaAtual] && traducoes[idiomaAtual][chave]) el.src = traducoes[idiomaAtual][chave];
    });

    if (typeof window.rerenderizarProjetos === "function") window.rerenderizarProjetos();
}

function mudarIdioma(lang) {
    idiomaAtual = lang;
    atualizarInterface();
}

window.mudarIdioma = mudarIdioma;
window.idiomaAtual = idiomaAtual;

document.addEventListener("DOMContentLoaded", () => {
    atualizarInterface();

    document.querySelectorAll(".btn-lang").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const lang = e.target.getAttribute("data-lang");
            if (lang) mudarIdioma(lang);
        });
    });
});