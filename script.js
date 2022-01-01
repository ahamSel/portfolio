const nav = document.querySelector("nav");
const real_age = document.querySelector(".real_age");

let today = new Date();
let years = today.getFullYear() - 2002;
let months = today.getMonth() + 1 - 8;
if (months < 0) {
  months += 12;
  years -= 1;
}
let days = today.getDate() - 24;
if (days < 0) {
  days += 31;
  months -= 1;
}

real_age.innerHTML = (years + months / 12 + days / 365.25).toFixed(2);

real_age.setAttribute(
  "tooltip",
  `${years} years ${months !== 0 ? `${months} months` : ""} ${
    days !== 0 ? `${days} days` : ""
  }`
);

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
    nav.classList.remove("anchor_click");
  }
});

[...nav.children].forEach((nav_btn) => {
  nav_btn.firstChild.addEventListener("click", () => {
    nav.classList.add("anchor_click");
    nav_link_clicked = true;
    setTimeout(() => {
      nav_link_clicked = false;
    }, 750);
  });
});
