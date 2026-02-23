document.addEventListener('DOMContentLoaded', function () {
  // Header margin for fixed header
  const mainHeader = document.getElementById('main-header');
  const heroSection = document.getElementById('home');

  function updateHeroMargin() {
    if (mainHeader && heroSection) {
      heroSection.style.marginTop = mainHeader.offsetHeight + 'px';
    }
  }

  // Hamburger Menu
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  const menuOpenIcon = document.getElementById('menu-open-icon');
  const menuCloseIcon = document.getElementById('menu-close-icon');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      menu.classList.toggle('hidden');
      var isMenuVisible = !menu.classList.contains('hidden');
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.classList.toggle('hidden', isMenuVisible);
        menuCloseIcon.classList.toggle('hidden', !isMenuVisible);
      }
    });
  }

  // Close menu when a link is clicked
  var menuLinks = document.querySelectorAll('#menu a');
  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.classList.remove('hidden');
          menuCloseIcon.classList.add('hidden');
        }
      }
    });
  });

  window.addEventListener('resize', updateHeroMargin);
  updateHeroMargin();

  // Footer year
  var currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Contact form → Google Forms (GET via hidden iframe)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var base = 'https://docs.google.com/forms/d/e/1FAIpQLSezr1NsLyxJY_ZQ9o2mF6cBreOw6uGCPSnjMxGwN2057yT4lg/formResponse?';
      var params = new URLSearchParams();
      new FormData(contactForm).forEach(function (value, key) {
        if (key.startsWith('entry.')) params.append(key, value);
      });
      params.append('submit', 'Submit');
      document.getElementById('hidden-iframe').src = base + params.toString();
      contactForm.classList.add('hidden');
      document.getElementById('form-success').classList.remove('hidden');
    });
  }

  // Slideshow
  var slideIndex = 1;
  var slides = document.getElementsByClassName('mySlides');

  function showSlides(n) {
    if (!slides.length) return;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
  }

  window.plusSlides = function (n) {
    showSlides((slideIndex += n));
  };

  if (slides.length) {
    showSlides(slideIndex);
  }
});
