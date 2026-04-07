const featuredProjects = [
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
    videoWidth: "324px",
    videoHeight: "697px"
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
    videoWidth: "600px",
    videoHeight: "450px"
  },
  {
    title: "Authentication and Data Patterns",
    stack: "Dart, Flutter, Firebase Auth, Firestore",
    summary:
      "A focused implementation of app authentication flows, Google sign-in, account linking, email verification, password reset, and realtime database-backed profile updates.",
    impact: "Useful technical reference for product authentication and data flows.",
    link: "https://github.com/ahamSel/flutter_firebase_login_signup",
    linkLabel: "View repo",
    image: "../assets/images/auth_db_poster.jpg"
  }
];

const earlierProjects = [
  {
    title: "Flutter Chat",
    description:
      "Mobile chat app exploring messaging data models, Firebase storage, and push notifications.",
    link: "https://github.com/ahamSel/flutter_chat_app"
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
  } else if (project.image) {
    const image = document.createElement("img");
    image.src = project.image;
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
  video.setAttribute("width", project.videoWidth);
  video.setAttribute("height", project.videoHeight);
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
    });

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
