const nav = document.querySelector("nav");

if (window.matchMedia("(min-width: 1080px)").matches) {
    if (nav) {
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
                nav.setAttribute("data-active-section", currentSection.id);
            }
        });
    }
}

const langToggleBtn = document.querySelector('.linguagemContainerBtn');
    const langMenu = document.querySelector('.linguagensMenu');
const hamburgerBtn = document.querySelector('.borgar');
    const navMenu = document.querySelector('.secoes');

if (langToggleBtn && langMenu) {
    langToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('aberto');
        if (navMenu) navMenu.classList.remove('aberto');
        if (hamburgerBtn) hamburgerBtn.classList.remove('ativo');
    });

    document.querySelectorAll('.linguagem').forEach(btn => {
        btn.addEventListener('click', () => {
            langMenu.classList.remove('aberto');
        });
    });
}
if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburgerBtn.classList.toggle('ativo');
        navMenu.classList.toggle('aberto');
        if (langMenu) langMenu.classList.remove('aberto');
    });

    document.querySelectorAll('.secoes a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('ativo');
            navMenu.classList.remove('aberto');
        });
    });
}

document.addEventListener('click', () => {
    if (langMenu) langMenu.classList.remove('aberto');
    if (navMenu) navMenu.classList.remove('aberto');
    if (hamburgerBtn) hamburgerBtn.classList.remove('ativo');
});