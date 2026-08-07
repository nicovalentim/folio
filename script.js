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