document.addEventListener("DOMContentLoaded", function () {
  handleResize();

  let timeout;
  window.onresize = function () {
    clearTimeout(timeout);
    timeout = setTimeout(handleResize, 100);
  };

  loadImageSwiper();
});

const handleResize = () => {
  updateVideo();
  updateNavigation();
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
