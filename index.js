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
