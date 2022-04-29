let modal;
var player;
document.addEventListener("DOMContentLoaded", function () {
  handleResize();

  let timeout;
  window.onresize = function () {
    clearTimeout(timeout);
    timeout = setTimeout(handleResize, 100);
  };

  initializeModalButton();

  loadImageSwiper();
});

const handleResize = () => {
  updateVideo();
  updateNavigation();
  player && resizeYoutube();
};

const updateVideo = () => {
  const video = document.querySelector("video");

  if (window.innerWidth < 991 && !/(mobile.mp4)/.test(video.src)) {
    return video.setAttribute("src", "/assets/video_mobile.mp4");
  }
  if (window.innerWidth > 991 && !/(desktop.mp4)/.test(video.src)) {
    return video.setAttribute("src", "/assets/video_desktop.mp4");
  }
};

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "349",
    width: "560",
    videoId: "iYAcEdg_7BU",
    playerVars: {
      playsinline: 1,
    },
    // events: {
    //   'onReady': onPlayerReady,
    //   'onStateChange': onPlayerStateChange
    // }
  });
}

const resizeYoutube = () => {
  const video = document.querySelector("iframe");
  console.log(video.height);
  // console.log(video.height != "349");
  console.log(video.height === "349");

  if (window.innerWidth > 560 && video.height !== "349") {
    console.log("reset");
    // Reset to default size
    video.setAttribute("height", "349");
    video.setAttribute("width", "560");
  } else {
    // Resize iframe
    const video = document.querySelector("iframe");
    // to calculate 16:9 height, multiply width by 56.25%
    let height = window.innerWidth * 0.5625;
    video.setAttribute("height", `${height}`);
    video.setAttribute("width", `${window.innerWidth}`);
  }
};

const updateNavigation = () => {
  const navigation = document.querySelector("nav");

  if (window.innerWidth < 991) {
    return navSwiper.enable();
  }
  if (window.innerWidth > 991) {
    navSwiper.slideTo(0, 0, false);
    return navSwiper.disable();
  }
};

const loadImageSwiper = () => {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    autoHeight: true,
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 400,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      // when window width is >= 991px
      991: {
        slidesPerView: 3,
        spaceBetween: 50,
        grabCursor: true,
      },
    },
  });
};

const navSwiper = new Swiper(".nav-swiper", {
  direction: "horizontal",
  loop: false,
  spaceBetween: 50,
  speed: 400,
  slidesPerView: 4.5,
});

const initializeModalButton = () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-open")) {
      console.log(e.target.dataset);
      modal = document.getElementById(e.target.dataset.id);
      console.log(modal);
      openModal(modal);
    } else if (e.target.classList.contains("modal-close")) {
      closeModal(modal);
    } else {
      return;
    }
  });
};

const openModal = (modal) => {
  document.body.style.overflow = "hidden";
  modal.setAttribute("open", "true");
  document.addEventListener("keyup", escClose);
  let overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  document.body.appendChild(overlay);

  player.playVideo();
};

const closeModal = (modal) => {
  document.body.style.overflow = "auto";
  modal.removeAttribute("open");
  document.removeEventListener("keyup", escClose);
  document.body.removeChild(document.getElementById("modal-overlay"));

  player.pauseVideo();
};

const escClose = (e) => {
  if (e.key === "Escape") {
    closeModal(modal);
  }
};
