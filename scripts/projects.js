const featuredProjects = [
  {
    title: "WebPilot",
    stack: "TypeScript, Electron, Playwright MCP, LLM APIs, Ollama",
    summary:
      "An open-source desktop app for agentic browsing. It connects browser automation, model/provider selection, local Ollama models, browser/profile choices, and inspectable run history so users can see how an agent worked through a task.",
    impact: "A current AI-agent product built around practical browser control and transparent execution traces.",
    link: "https://github.com/ahamSel/WebPilot",
    linkLabel: "View repo",
    videoPoster: "../assets/images/webpilot_poster.jpg",
    videoSources: [
      { src: "../assets/videos/webpilot_vid.webm", type: "video/webm" },
      { src: "../assets/videos/webpilot_vid.mp4", type: "video/mp4" }
    ],
    videoWidth: 2016,
    videoHeight: 1134
  },
  {
    title: "BusBoard NL",
    stack: "Dart, Flutter, GTFS, realtime transit data",
    summary:
      "A mobile app for real-time Metrobus departures across St. John's, Mount Pearl, and Paradise. It combines public GTFS schedule data with live vehicle tracking to show practical arrival information for local riders.",
    impact: "Shipped product for a real local transit use case.",
    link: "https://ahamsel.com/busboard",
    linkLabel: "Get the app",
    image: "../assets/images/busboard_logo.png",
    videoPoster: "../assets/images/busboard-nl_poster.jpg",
    videoSources: [
      { src: "../assets/videos/busboard-nl.webm", type: "video/webm" },
      { src: "../assets/videos/busboard-nl.mp4", type: "video/mp4" }
    ],
    videoWidth: 1180,
    videoHeight: 2556
  },
  {
    title: "PropertyCopy AI",
    stack: "Flutter, Firebase, Vertex AI",
    summary:
      "A working service for generating property listing copy from property photos and structured details. Built around a practical workflow for real estate-style media and description generation.",
    impact: "Professional app/service with policy and support pages already live.",
    link: "https://ahamsel.com/apps/privacy-policy/propertycopy",
    linkLabel: "View app docs",
    image: "../assets/images/propertycopy_logo.png"
  },
  {
    title: "Financial Insight",
    stack: "TypeScript, React, Python, Flask",
    summary:
      "A full-stack budgeting and financial planning prototype that analyzes expenses, income, and wishlist costs to return personalized recommendations from a Flask API.",
    impact: "Good representation of end-to-end product thinking and API integration.",
    link: "https://ahamsel.github.io/financial_insight",
    linkLabel: "Try the prototype",
    image: "../assets/images/fin_insight_poster.jpg",
    videoPoster: "../assets/images/fin_insight_poster.jpg",
    videoSources: [
      { src: "../assets/videos/fin_insight_vid.webm", type: "video/webm" },
      { src: "../assets/videos/fin_insight_vid.mp4", type: "video/mp4" }
    ],
    videoWidth: 1440,
    videoHeight: 1080
  },
  {
    title: "Flutter Chat",
    stack: "Dart, Flutter, Firebase, FCM",
    summary:
      "A real-time mobile chat app with Firestore-backed messaging, Google sign-in authentication, and push notifications delivered through Firebase Cloud Messaging.",
    impact: "End-to-end messaging experience demonstrating realtime data sync, push notification delivery, and graceful handling of deleted accounts.",
    link: "https://github.com/ahamSel/flutter_chat_app",
    linkLabel: "View repo",
    videoPoster: "../assets/images/chat_poster.jpg",
    videoSources: [
      { src: "../assets/videos/chat_vid.webm", type: "video/webm" },
      { src: "../assets/videos/chat_vid.mp4", type: "video/mp4" }
    ],
    videoWidth: 984,
    videoHeight: 1080
  }
];

const earlierProjects = [
  {
    title: "Authentication and Data Patterns",
    description:
      "A focused implementation of app authentication flows, Google sign-in, account linking, email verification, password reset, and realtime database-backed profile updates.",
    link: "https://github.com/ahamSel/flutter_firebase_login_signup"
  },
  {
    title: "World Times",
    description:
      "Flutter learning project for regional time lookup, search, and API-backed UI state.",
    link: "https://github.com/ahamSel/world_time_fapp"
  },
  {
    title: "Game Without Art",
    description:
      "Unity arcade prototype from an earlier game-development learning phase.",
    link: "https://github.com/ahamSel/Lockdown"
  },
  {
    title: "DotDodge",
    description:
      "Unity Android game prototype focused on homing-object movement and difficulty progression.",
    link: "https://github.com/ahamSel/dtddge-android"
  }
];

const projectsContainer = document.querySelector(".project-items");
const archiveContainer = document.querySelector(".archive-projects");

featuredProjects.forEach((project) => {
  const projectItem = document.createElement("article");
  projectItem.classList.add("project-card");

  const media = document.createElement("div");
  media.classList.add("project-media");

  if (project.videoSources) {
    appendVideoToElement(media, project);
    media.classList.add("has-video");
    media.setAttribute("title", "Click to expand");
    media.addEventListener("click", function () {
      openVideoLightbox(project);
    });
  } else if (project.image) {
    const image = document.createElement("img");
    image.src = project.image;
    if (project.imageClass) image.classList.add(project.imageClass);
    image.alt = "";
    image.loading = "lazy";
    media.appendChild(image);
  }

  const content = document.createElement("div");
  content.classList.add("project-content");
  content.innerHTML = `
    <p class="eyebrow">${project.stack}</p>
    <h2>${project.title}</h2>
    <p>${project.summary}</p>
    <p class="project-impact">${project.impact}</p>
    <a class="button-link" href="${project.link}" target="_blank" rel="noopener">${project.linkLabel}</a>
  `;

  projectItem.appendChild(content);
  projectItem.appendChild(media);
  projectsContainer.appendChild(projectItem);
});

archiveContainer.innerHTML = `
  <div class="content-card">
    <p class="eyebrow">Earlier experiments</p>
    <h2>Kept smaller on purpose.</h2>
    <p>
      These are older learning projects. They are still part of the path, but
      they are no longer the main story of the portfolio.
    </p>
    <div class="archive-grid"></div>
  </div>
`;

const archiveGrid = archiveContainer.querySelector(".archive-grid");

earlierProjects.forEach((project) => {
  const item = document.createElement("a");
  item.classList.add("archive-item");
  item.href = project.link;
  item.target = "_blank";
  item.rel = "noopener";
  item.innerHTML = `
    <strong>${project.title}</strong>
    <span>${project.description}</span>
  `;
  archiveGrid.appendChild(item);
});

function appendVideoToElement(element, project) {
  const video = document.createElement("video");
  video.className = "lazy";
  if (project.videoWidth && project.videoHeight) {
    video.width = project.videoWidth;
    video.height = project.videoHeight;
  }
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("loop", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("poster", project.videoPoster);

  project.videoSources.forEach((sourceInfo) => {
    const source = document.createElement("source");
    source.setAttribute("data-src", sourceInfo.src);
    source.setAttribute("type", sourceInfo.type);
    video.appendChild(source);
  });

  element.appendChild(video);
}

document.addEventListener("DOMContentLoaded", function () {
  const lazyVideos = Array.from(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    const lazyVideoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          hydrateVideo(video.target);
          lazyVideoObserver.unobserve(video.target);
        }
      });
    }, { rootMargin: "200px" });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  } else {
    lazyVideos.forEach(hydrateVideo);
  }
});

function hydrateVideo(video) {
  Array.from(video.children).forEach((videoSource) => {
    if (videoSource.tagName === "SOURCE") {
      videoSource.src = videoSource.dataset.src;
    }
  });

  video.load();
  video.muted = true;
  video.play().catch((error) => console.error("Autoplay failed", error));
  video.classList.remove("lazy");
}

function openVideoLightbox(project) {
  var existing = document.querySelector(".video-lightbox");
  if (existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.className = "video-lightbox";

  var closeBtn = document.createElement("button");
  closeBtn.className = "video-lightbox-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.setAttribute("aria-label", "Close video");
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closeVideoLightbox(overlay);
  });

  var video = document.createElement("video");
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("loop", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("controls", "");
  if (project.videoWidth && project.videoHeight) {
    video.width = project.videoWidth;
    video.height = project.videoHeight;
  }

  project.videoSources.forEach(function (sourceInfo) {
    var source = document.createElement("source");
    source.src = sourceInfo.src;
    source.type = sourceInfo.type;
    video.appendChild(source);
  });

  overlay.appendChild(closeBtn);
  overlay.appendChild(video);
  document.body.appendChild(overlay);

  requestAnimationFrame(function () {
    overlay.classList.add("active");
  });

  video.focus();

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeVideoLightbox(overlay);
    }
  });

  document.addEventListener("keydown", handleLightboxEscape);
  overlay._escapeHandler = handleLightboxEscape;
}

function handleLightboxEscape(e) {
  if (e.key === "Escape") {
    var overlay = document.querySelector(".video-lightbox");
    if (overlay) closeVideoLightbox(overlay);
  }
}

function closeVideoLightbox(overlay) {
  overlay.classList.remove("active");
  document.removeEventListener("keydown", overlay._escapeHandler);

  setTimeout(function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, 300);
}
