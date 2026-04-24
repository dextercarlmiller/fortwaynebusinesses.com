/* ============================================================
   FORT WAYNE WEB STUDIO — main.js
   Dark mode toggle, nav scroll behavior
   ============================================================ */

(function () {
  'use strict';

  /* ── Dark mode ── */
  const THEME_KEY = 'fwws-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* ── Nav scroll behavior ── */
  function initNavScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active nav link ── */
  function setActiveNavLink() {
    const path = window.location.pathname.replace(/\/$/, '');
    const links = document.querySelectorAll('.nav-links a, .nav-drawer-links a');

    links.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPath = href.replace(/\/$/, '');

      if (path === '' || path === '/index.html') {
        if (linkPath === 'index.html' || linkPath === '/' || linkPath === '') {
          link.classList.add('active');
        }
      } else if (path.endsWith(linkPath) && linkPath !== '') {
        link.classList.add('active');
      }
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavScroll();
    setActiveNavLink();

    // Wire up dark mode toggle buttons
    document.querySelectorAll('.dark-toggle').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Run theme init immediately to avoid flash
  initTheme();
})();
