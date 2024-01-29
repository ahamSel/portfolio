const projects = [
  {
    title: "Chat [Dart, Flutter]",
    description: "is a mobile chat app that enables users to send and receive messages. An optimized database schema is used for efficient storage and retrieval of data, including messages, user information, and chat conversations. The app also utilizes a Firebase-based cloud messaging system to send and receive notifications about new messages when it's not in foreground.",
    githubLink: "https://github.com/ahamSel/flutter_chat_app",
    videoPoster: "../images/chat_poster.jpg",
    videoSources: [
      { src: "../videos/chat_vid.webm", type: "video/webm" },
      { src: "../videos/chat_vid.mp4", type: "video/mp4" }
    ],
    width: "546.6px",
    height: "600px"
  },
  {
    title: "Authentication & Database with Firebase [Dart, Flutter]",
    description: "is a mobile app that provides a range of functionalities such as Sign-Up/Log-In, Google Sign-In and linking, email verification, password reset, and the ability to add or modify personal information. It also allows for the real-time display of users from the database, a feature that can be used for any type of data or updates, whether they are general or specific to each user.",
    githubLink: "https://github.com/ahamSel/flutter_firebase_login_signup",
    videoPoster: "../images/auth_db_poster.jpg",
    videoSources: [
      { src: "../videos/auth_db_vid.webm", type: "video/webm" },
      { src: "../videos/auth_db_vid.mp4", type: "video/mp4" }
    ],
    width: "324px",
    height: "673.8px"
  },
  {
    title: "World Times [Dart, Flutter]",
    description: `is a mobile app to retrieve and show time data of regions from <a href="https://worldtimeapi.org" target="_blank">worldtimeapi.org</a>. It starts by automatically fetching the current time of the user's region, determined via public IP address. The user can choose from all the regions presented in a scrollable list-view or use an implemented search bar to find the one they're looking for.`,
    githubLink: "https://github.com/ahamSel/world_time_fapp",
    videoPoster: "../images/worldtimes_poster.jpg",
    videoSources: [
      { src: "../videos/worldtimes_vid.webm", type: "video/webm" },
      { src: "../videos/worldtimes_vid.mp4", type: "video/mp4" }
    ],
    width: "324px",
    height: "673.8px"
  },
  {
    title: "Game Without Art [C#, Unity]",
    description: `is a 2D game where the player navigates through a space filled with bouncing red balls. At a certain increased size, each ball splits into smaller ones, progressively intensifying the gameplay. Players can use power-ups to enhance their chances of survival. <a href="https://aaess.itch.io/game-without-art" target="_blank">Try it out!</a>`,
    githubLink: "https://github.com/ahamSel/Lockdown",
    videoPoster: "../images/gwa_poster.jpg",
    videoSources: [
      { src: "../videos/gwa_vid.webm", type: "video/webm" },
      { src: "../videos/gwa_vid.mp4", type: "video/mp4" }
    ],
    width: "576px",
    height: "324px"
  },
  {
    title: "DotDodge [C#, Unity]",
    description: `is a 2D game where the player's objective is to evade increasingly challenging homing objects. As time progresses, the difficulty level increases, making survival more challenging. The game ends when the timer runs out, marking the player's triumph. <a href="https://aaess.itch.io/dotdodge" target="_blank">Try it out!</a>`,
    githubLink: "https://github.com/ahamSel/dtddge-android",
    videoPoster: "../images/dotdodge_poster.jpg",
    videoSources: [
      { src: "../videos/dotdodge_vid.webm", type: "video/webm" },
      { src: "../videos/dotdodge_vid.mp4", type: "video/mp4" }
    ],
    width: "576px",
    height: "324px"
  },
];

const projectsContainer = document.querySelector('.project-items');

projects.forEach((project, index) => {
  const projectItem = document.createElement('div');
  projectItem.classList.add('project-item');

  projectItem.classList.add(index % 2 === 0 ? 'left' : 'right');

  const description = document.createElement('p');
  const link = document.createElement('a');
  link.setAttribute('href', project.githubLink);
  link.setAttribute('target', '_blank');
  link.innerHTML = `<b>${project.title}</b>`;
  description.appendChild(link);
  description.insertAdjacentHTML('beforeend', ` ${project.description}`);
  projectItem.appendChild(description);

  const videoLi = document.createElement('div');
  videoLi.classList.add('video-container');
  projectItem.appendChild(videoLi);
  appendVideoToElement(videoLi, project);

  projectsContainer.appendChild(projectItem);
});

function appendVideoToElement(element, project) {
  const video = document.createElement('video');
  video.className = 'lazy';
  video.setAttribute('width', project.width);
  video.setAttribute('height', project.height);
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('poster', project.videoPoster);

  project.videoSources.forEach(sourceInfo => {
    const source = document.createElement('source');
    source.setAttribute('data-src', sourceInfo.src);
    source.setAttribute('type', sourceInfo.type);
    video.appendChild(source);
  });

  element.appendChild(video);
}


document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.muted = true;
          video.target.play().catch(e => console.error("Autoplay failed", e));
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  } else {
    lazyVideos.forEach(function (lazyVideo) {
      for (var source in lazyVideo.children) {
        var videoSource = lazyVideo.children[source];
        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
          videoSource.src = videoSource.dataset.src;
        }
      }

      lazyVideo.load();
      lazyVideo.muted = true;
      lazyVideo.play().catch(e => console.error("Autoplay failed", e));
      lazyVideo.classList.remove("lazy");
    });
  }
});
