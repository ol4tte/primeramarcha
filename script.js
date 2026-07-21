/* =========================================================
   PRIMERA MARCHA — Interactions
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 350);
  });
  // Fallback in case 'load' is delayed by the external videos
  setTimeout(() => loader && loader.classList.add('hidden'), 2200);

  /* ---------- Sticky nav shrink on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(el => {
    const delay = el.getAttribute('data-delay');
    if (delay) el.style.setProperty('--d', delay);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => io.observe(el));

  /* ---------- Hero cinematic video rotation ---------- */
  const videos = Array.from(document.querySelectorAll('.hero-video'));
  if (videos.length > 1) {
    let current = 0;
    videos.forEach(v => { v.play && v.play().catch(() => {}); });

    const rotate = () => {
      const next = (current + 1) % videos.length;
      videos[current].classList.remove('active');
      videos[next].classList.add('active');
      current = next;
    };

    setInterval(rotate, 8000);
  }

  /* ---------- Subtle parallax on hero video ---------- */
  const heroVideoWrap = document.querySelector('.hero-video-wrap');
  const hero = document.querySelector('.hero');
  if (hero && heroVideoWrap) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroVideoWrap.style.transform = `translateY(${y * 0.25}px)`;
      }
    }, { passive: true });
  }

});
