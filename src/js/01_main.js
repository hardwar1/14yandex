document.addEventListener("DOMContentLoaded", function () {
  function qOne(selector) {
    return document.querySelector(selector);
  }

  function qAll(selector) {
    return document.querySelectorAll(selector);
  }

  const swiper1 = new Swiper('.rules__swiper', {
    speed: 1500,
    spaceBetween: 100,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });
  // slider 
  var win = window,
    doc = document,
    docElem = doc.documentElement,
    x = win.innerWidth || docElem.clientWidth || body[0].clientWidth;

  function sliders(number) {
    if (x < 768 && qOne(`.swiper${number}`)) {
      qOne(`.swiper${number}`)
        .querySelector("ul")
        .classList.add("swiper-wrapper");
    }

    var swiper2 = new Swiper(`.swiper${number}`, {
      speed: 800,
      spaceBetween: 10,
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
    });
  }
  // offers__slide
  sliders(2);
  sliders(3);
  sliders(4);

  // скроллы якорных ссылок
  const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 1000,
    framesCount = 200;

  anchors.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

      let scroller = setInterval(function () {
        // скорость прокрутки
        let scrollBy = 15;
        if (Math.abs(window.pageYOffset - coordY) <= 24) {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        } else if (scrollBy < window.pageYOffset - coordY) {
          window.scrollBy(0, -scrollBy);
        } else if (scrollBy > window.pageYOffset - coordY) {
          window.scrollBy(0, scrollBy);
        }

      }, animationTime / framesCount);
    });
  });



});