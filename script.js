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

// video lazy-loading
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
