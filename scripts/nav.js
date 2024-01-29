const nav = document.querySelector("nav");

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    nav.classList.add("hide-nav");
  } else {
    nav.classList.remove("hide-nav");
  }
  lastScrollY = window.scrollY;
});
