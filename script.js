(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu-principale");

  if (navToggle && header && nav) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -48px 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Mobile CTA: hide when form is in view */
  var mobileCta = document.querySelector(".mobile-cta");
  var formSection = document.getElementById("contatti");
  if (mobileCta && formSection && "IntersectionObserver" in window) {
    var ctaIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          mobileCta.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.15 }
    );
    ctaIo.observe(formSection);
  }

  /* Contact form: gestito da embed OpnForm (iframe); nessuno script locale necessario */
})();
