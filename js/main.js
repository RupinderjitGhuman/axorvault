/* ═══════════════════════════════════════════════════════════
   AXORVAULT — main.js
   Progressive enhancement: the site works without this file.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Mobile navigation toggle ────────────────────────────────
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var links = document.getElementById('primary-nav');

  if (toggle && links && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu after choosing a link (mobile UX)
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // ── Sticky header shadow on scroll ──────────────────────────
  var scrolledClass = 'nav--scrolled';
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle(scrolledClass, window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Scroll-reveal (IntersectionObserver) ────────────────────
  var revealEls = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // No JS observer or reduced motion → show everything
    revealEls.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

  // ── Animated stat counters ──────────────────────────────────
  var counters = document.querySelectorAll('.stat__num[data-count]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400; // ms
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
      });
    } else {
      var counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach(function (el) {
        counterObserver.observe(el);
      });
    }
  }

  // ── Contact form (front-end demo only) ──────────────────────
  var form = document.querySelector('.contact__form');
  var status = document.querySelector('.form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!status) return;

      // Clear previous state
      status.textContent = '';
      status.className = 'form-status';
      form.querySelectorAll('[aria-invalid]').forEach(function (f) {
        f.removeAttribute('aria-invalid');
      });

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      var valid = true;

      if (!name) {
        form.elements.name.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (!email || !emailOk) {
        form.elements.email.setAttribute('aria-invalid', 'true');
        valid = false;
      }
      if (!message) {
        form.elements.message.setAttribute('aria-invalid', 'true');
        valid = false;
      }

      if (!valid) {
        status.textContent = 'Please complete the highlighted fields.';
        status.classList.add('form-status--error');
        return;
      }

      // NOTE: front-end demo — swap this for a real endpoint
      // (Formspree, Azure Functions, or Graph sendMail).
      status.textContent =
        "Thanks, " + name.split(' ')[0] + " — message received. We'll reply within one business day.";
      status.classList.add('form-status--ok');
      form.reset();
    });
  }

  // ── Footer year ─────────────────────────────────────────────
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
