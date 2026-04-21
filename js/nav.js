/* ============================================================
   FORT WAYNE WEB STUDIO — nav.js
   Mobile hamburger menu drawer
   ============================================================ */

(function () {
  'use strict';

  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const drawer    = document.querySelector('.nav-drawer');
    const overlay   = document.querySelector('.nav-overlay');
    if (!hamburger || !drawer) return;

    function openDrawer() {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close when a drawer link is clicked
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  document.addEventListener('DOMContentLoaded', initMobileNav);
})();
