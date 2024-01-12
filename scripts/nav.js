const nav = document.querySelector("nav");

let last_vscroll = window.scrollY;
let nav_link_clicked = false;
window.addEventListener("scroll", () => {
  if (!nav_link_clicked) {
    if (last_vscroll < window.scrollY) {
      nav.classList.add("scrolling_down");
    } else {
      nav.classList.remove("scrolling_down");
    }
    last_vscroll = window.scrollY;
  }
});