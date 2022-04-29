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

// Initialize Youtube Player
// This code loads the Youtube IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "349",
    width: "560",
    videoId: "iYAcEdg_7BU",
    playerVars: {
      playsinline: 1,
    },
  });
}

// Update elements on page that rely on the page size
const handleResize = () => {
  updateVideoSrc();
  toggleNavigationSwiper();
  player && resizeYoutube();
};

const updateVideoSrc = () => {
  const video = document.querySelector("video");

  if (window.innerWidth < 991 && !/(mobile.mp4)/.test(video.src)) {
    return video.setAttribute("src", "./assets/video_mobile.mp4");
  }
  if (window.innerWidth > 991 && !/(desktop.mp4)/.test(video.src)) {
    return video.setAttribute("src", "./assets/video_desktop.mp4");
  }
};

// Resize iframe as needed
const resizeYoutube = () => {
  const video = document.querySelector("iframe");
  if (window.innerWidth > 560) {
    // Reset to default size
    video.setAttribute("height", "349");
    video.setAttribute("width", "560");
  } else {
    const video = document.querySelector("iframe");
    // to calculate 16:9 height, multiply width by 56.25%
    // Subtracting width to allow for margin
    let newWidth = window.innerWidth - 10;
    let height = (window.innerWidth - 16) * 0.5625;
    video.setAttribute("height", `${height}`);
    video.setAttribute("width", `${newWidth}`);
  }
};

const toggleNavigationSwiper = () => {
  if (window.innerWidth < 991) {
    return navSwiper.enable();
  }
  if (window.innerWidth > 991) {
    navSwiper.slideTo(0, 0, false);
    return navSwiper.disable();
  }
};

// Modal
const initializeModalButton = () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-open")) {
      modal = document.getElementById(e.target.dataset.id);
      openModal(modal);
    } else if (
      e.target.classList.contains("modal-close") ||
      !e.target.closest(".modal")
    ) {
      closeModal(modal);
    } else {
      return;
    }
  });
};

const openModal = (modal) => {
  player && resizeYoutube();
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

// Navigation Swiper
const navSwiper = new Swiper(".nav-swiper", {
  direction: "horizontal",
  loop: false,
  spaceBetween: 50,
  speed: 400,
  slidesPerView: 4.5,
});

// Large Image Carousel Swiper
const loadImageSwiper = () => {
  const swiper = new Swiper(".swiper", {
    autoHeight: true,
    direction: "horizontal",
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 400,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      // when window width is >= 1px
      1: {
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
