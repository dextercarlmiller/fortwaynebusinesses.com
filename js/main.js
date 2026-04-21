/* ============================================================
   FORT WAYNE WEB STUDIO — main.js
   Dark mode toggle, custom cursor, nav scroll behavior
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

  /* ── Custom cursor (desktop only) ── */
  function initCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX   = 0, dotY   = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const interactiveSelectors = 'a, button, [role="button"], label, input, select, textarea, .btn, .project-card, .faq-question';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    function animate() {
      // Lerp: dot follows faster (0.15), ring follows slower (0.08)
      dotX  += (mouseX - dotX)  * 0.15;
      dotY  += (mouseY - dotY)  * 0.15;
      ringX += (mouseX - ringX) * 0.08;
      ringY += (mouseY - ringY) * 0.08;

      dot.style.transform  = `translate(calc(-50% + ${dotX}px), calc(-50% + ${dotY}px))`;
      ring.style.transform = `translate(calc(-50% + ${ringX}px), calc(-50% + ${ringY}px))`;

      // Use top/left = 0 with transform offset for performance
      dot.style.top  = '0px';
      dot.style.left = '0px';
      ring.style.top  = '0px';
      ring.style.left = '0px';

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
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
    initCursor();
    setActiveNavLink();

    // Wire up dark mode toggle buttons
    document.querySelectorAll('.dark-toggle').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
  });

  // Run theme init immediately to avoid flash
  initTheme();
})();
