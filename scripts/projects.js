const projects = [
    {
      title: "Chat [Dart, Flutter]",
      description: "is a mobile chat app that provides the service of sending and receiving messages. An optimized database schema is used for efficient storage and retrieval of data, including messages, user information, and chat conversations. The app also utilizes a cloud messaging system to send and receive notifications about new messages when it is not in foreground.",
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
      description: "is a mobile app that provides a range of essential functionalities such as Sign-Up/Log-In, Google Sign-In and linking, email verification, password reset, and the ability to add or modify personal information. Additionally, the app allows showing, in real-time, users from the database. This functionality can be used to display any type of data or update in real-time, general or specific to each user.",
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
      description: `is a mobile app to retrieve and show time data of regions from <a href="https://worldtimeapi.org" target="_blank">worldtimeapi.org</a>. The app starts by automatically fetching the current time of the user's region. The user can choose from all the regions presented in a scrollable list-view or use an implemented search bar to find their desired one.`,
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
      description: `is a game where the player must dodge balls constantly bouncing off walls. Each ball grows and pops into three small ones that act as their parent. Powerups are implemented to help survive longer. <a href="https://aaess.itch.io/game-without-art" target="_blank">Try it out!</a>`,
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
      description: `is game where the player tries to beat it by dodging all homing missiles. The game gets harder the longer you survive. The player wins when the timer hits zero. <a href="https://aaess.itch.io/dotdodge" target="_blank">Try it out!</a>`,
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
    const projectItem = document.createElement('ul');
  
    if (index % 2 === 0) {
      const videoLi = document.createElement('li');
      projectItem.appendChild(videoLi);
      appendVideoToElement(videoLi, project);
    }
    
    const textLi = document.createElement('li');
    const description = document.createElement('p');
    const link = document.createElement('a');
    link.setAttribute('href', project.githubLink);
    link.setAttribute('target', '_blank');
    link.innerHTML = `<b>${project.title}</b>`;
    description.appendChild(link);
    description.insertAdjacentHTML('beforeend', ` ${project.description}`);
    textLi.appendChild(description);
    projectItem.appendChild(textLi);
  
    if (index % 2 !== 0) {
      const videoLi = document.createElement('li');
      projectItem.appendChild(videoLi);
      appendVideoToElement(videoLi, project);
    }
  
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
            video.target.muted = true;
            video.target.play().catch(e => console.error("Autoplay failed", e));
            video.target.classList.remove("lazy");
            lazyVideoObserver.unobserve(video.target);
          }
        });
      });
  
      lazyVideos.forEach(function(lazyVideo) {
        lazyVideoObserver.observe(lazyVideo);
      });
    } else {
      lazyVideos.forEach(function(lazyVideo) {
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
  
  