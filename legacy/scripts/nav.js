const nav = document.querySelector("nav");

let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    nav.classList.add("hide-nav");
    document.body.classList.add("nav-hidden");
  } else {
    nav.classList.remove("hide-nav");
    document.body.classList.remove("nav-hidden");
  }
  lastScrollY = window.scrollY;
});
