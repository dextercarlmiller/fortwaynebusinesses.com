/* ============================================================
   FORT WAYNE WEB STUDIO — animations.js
   Scroll reveal, counter animation, portfolio filter, FAQ accordion
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Scroll Reveal ── */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ── 2. Counter Animation ── */
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target) || 0;
    const duration = 1500;
    const start    = performance.now();
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const isFloat  = String(target).includes('.');
    const decimals = isFloat ? String(target).split('.')[1].length : 0;

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = target * eased;

      el.textContent = prefix + (isFloat ? current.toFixed(decimals) : Math.floor(current)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + (isFloat ? target.toFixed(decimals) : target) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counterEls = document.querySelectorAll('.count-up');
    if (!counterEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach((el) => observer.observe(el));
  }

  /* ── 3. Portfolio Filter ── */
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards      = document.querySelectorAll('.project-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.filter;

        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        cards.forEach((card) => {
          const cardCategory = card.dataset.category;
          const matches = category === 'all' || cardCategory === category;

          if (matches) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              if (card.style.opacity === '0') {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  }

  /* ── 4. FAQ Accordion ── */
  function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer   = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items
        items.forEach((i) => {
          i.classList.remove('open');
          const a = i.querySelector('.faq-answer');
          if (a) {
            a.style.maxHeight = '0';
            a.style.opacity   = '0';
          }
        });

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.opacity   = '1';
        }
      });

      // Init closed
      answer.style.maxHeight = '0';
      answer.style.overflow  = 'hidden';
      answer.style.opacity   = '0';
      answer.style.transition = 'max-height 0.35s ease, opacity 0.25s ease';
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initCounters();
    initPortfolioFilter();
    initFaqAccordion();
  });
})();
