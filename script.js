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

  /* Form validation */
  var form = document.getElementById("form-contatto");
  if (!form) return;

  var nome = document.getElementById("nome");
  var email = document.getElementById("email");
  var telefono = document.getElementById("telefono");
  var gdpr = document.getElementById("gdpr");
  var successEl = document.getElementById("form-success");

  function setError(id, msg) {
    var el = document.getElementById(id);
    if (el) el.textContent = msg || "";
  }

  function validateNome() {
    var v = (nome.value || "").trim();
    if (!v) {
      nome.classList.add("is-invalid");
      nome.classList.remove("is-valid");
      setError("nome-err", "Inserisci nome e cognome.");
      return false;
    }
    if (v.length < 3) {
      nome.classList.add("is-invalid");
      nome.classList.remove("is-valid");
      setError("nome-err", "Inserisci un nome completo.");
      return false;
    }
    nome.classList.remove("is-invalid");
    nome.classList.add("is-valid");
    setError("nome-err", "");
    return true;
  }

  function validateEmail() {
    var v = (email.value || "").trim();
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v) {
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      setError("email-err", "Inserisci un indirizzo email.");
      return false;
    }
    if (!re.test(v)) {
      email.classList.add("is-invalid");
      email.classList.remove("is-valid");
      setError("email-err", "Email non valida.");
      return false;
    }
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    setError("email-err", "");
    return true;
  }

  function validateTelefono() {
    var v = (telefono.value || "").trim();
    var digits = v.replace(/\D/g, "");
    if (!v) {
      telefono.classList.add("is-invalid");
      telefono.classList.remove("is-valid");
      setError("telefono-err", "Inserisci un numero di telefono.");
      return false;
    }
    if (digits.length < 8) {
      telefono.classList.add("is-invalid");
      telefono.classList.remove("is-valid");
      setError("telefono-err", "Numero troppo corto.");
      return false;
    }
    telefono.classList.remove("is-invalid");
    telefono.classList.add("is-valid");
    setError("telefono-err", "");
    return true;
  }

  function validateGdpr() {
    if (!gdpr.checked) {
      setError("gdpr-err", "Devi accettare il trattamento dei dati per procedere.");
      return false;
    }
    setError("gdpr-err", "");
    return true;
  }

  nome.addEventListener("blur", validateNome);
  nome.addEventListener("input", function () {
    if (nome.classList.contains("is-invalid") || nome.classList.contains("is-valid")) validateNome();
  });

  email.addEventListener("blur", validateEmail);
  email.addEventListener("input", function () {
    if (email.classList.contains("is-invalid") || email.classList.contains("is-valid")) validateEmail();
  });

  telefono.addEventListener("blur", validateTelefono);
  telefono.addEventListener("input", function () {
    if (telefono.classList.contains("is-invalid") || telefono.classList.contains("is-valid")) validateTelefono();
  });

  gdpr.addEventListener("change", function () {
    if (gdpr.checked) setError("gdpr-err", "");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var okNome = validateNome();
    var okEmail = validateEmail();
    var okTel = validateTelefono();
    var okGdpr = validateGdpr();
    if (!okNome || !okEmail || !okTel || !okGdpr) return;

    if (successEl) {
      successEl.hidden = false;
      form.reset();
      nome.classList.remove("is-valid", "is-invalid");
      email.classList.remove("is-valid", "is-invalid");
      telefono.classList.remove("is-valid", "is-invalid");
      successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
})();
