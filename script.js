gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Preloader ---------------- */
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const bar = preloader.querySelector('.bar i');
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloader, {
          yPercent: -100, duration: 0.9, ease: 'power4.inOut',
          onComplete: () => preloader.remove()
        });
        runIntro();
      }
    });
    tl.to(bar, { width: '100%', duration: 1.1, ease: 'power2.inOut' });
  } else {
    runIntro();
  }

  /* ---------------- Split hero title into lines/words for reveal ---------------- */
  document.querySelectorAll('.hero-title').forEach(el => {
    const lines = el.querySelectorAll('.line');
    lines.forEach(line => {
      const text = line.textContent;
      line.innerHTML = `<span>${text}</span>`;
    });
  });

  function runIntro() {
    const heroLines = gsap.utils.toArray('.hero-title .line span');
    if (heroLines.length) {
      gsap.set(heroLines, { yPercent: 120, rotate: 4 });
      gsap.to(heroLines, {
        yPercent: 0, rotate: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09, delay: 0.15
      });
    }
    gsap.from('.hero-sub, .hero-actions, .hero-meta .stat, .hero-badge', {
      y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.55
    });
    gsap.from('.hero-bg img', { scale: 1.18, duration: 1.8, ease: 'power2.out' });
  }

  /* ---------------- Sticky nav background on scroll ---------------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { targets: nav, className: 'is-scrolled' }
    });
  }

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  /* ---------------- Generic scroll reveals ---------------- */
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
  });

  /* Stagger children within .reveal-group */
  gsap.utils.toArray('.reveal-group').forEach(group => {
    const items = group.children;
    gsap.set(items, { opacity: 0, y: 36 });
    gsap.to(items, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 85%' }
    });
  });

  /* ---------------- Section eyebrow / headline reveal ---------------- */
  gsap.utils.toArray('.section-head, .about-lead').forEach(el => {
    gsap.from(el.children, {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  /* ---------------- Marquee infinite loop ---------------- */
  gsap.utils.toArray('.marquee-track').forEach(track => {
    const clone = track.innerHTML;
    track.innerHTML += clone; // duplicate content for seamless loop
    const width = track.scrollWidth / 2;
    gsap.to(track, { x: -width, duration: 22, ease: 'none', repeat: -1 });
  });

  /* ---------------- Counters (odometer style) ---------------- */
  gsap.utils.toArray('[data-count]').forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target, duration: 1.8, ease: 'power2.out',
          onUpdate: () => { el.textContent = (target % 1 === 0 ? Math.floor(obj.val) : obj.val.toFixed(1)) + suffix; }
        });
      }
    });
  });

  /* ---------------- Parallax hero background (Webflow-style depth) ---------------- */
  gsap.utils.toArray('.hero-bg img').forEach(img => {
    gsap.to(img, {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: img.closest('.hero'), start: 'top top', end: 'bottom top', scrub: true }
    });
  });

  /* ---------------- Parallax for section images ---------------- */
  gsap.utils.toArray('[data-parallax]').forEach(img => {
    gsap.to(img, {
      yPercent: -14, ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ---------------- Card grid stagger-in ---------------- */
  gsap.utils.toArray('.grid-3, .grid-4, .stat-row').forEach(grid => {
    gsap.from(grid.children, {
      opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: grid, start: 'top 88%' }
    });
  });

  /* ---------------- 3D tilt on car cards / feature cards (mouse-follow) ---------------- */
  document.querySelectorAll('.car-card, .feature-card').forEach(card => {
    const strength = 10;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: x * strength, rotateX: -y * strength, duration: 0.5, ease: 'power2.out', transformPerspective: 900 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' });
    });
  });

  /* ---------------- Speed divider reveal (skew wipe) ---------------- */
  gsap.utils.toArray('.speed-divider').forEach(div => {
    gsap.from(div, {
      scaleY: 0, transformOrigin: 'top', duration: 1,
      scrollTrigger: { trigger: div, start: 'top 95%' }
    });
  });

  /* ---------------- Blog / dealer card hover pop already handled via CSS; add entrance ---------------- */
  gsap.utils.toArray('.blog-card, .dealer-card, .testi-card, .team-card').forEach(el => {
    gsap.from(el, {
      opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  /* ---------------- Timeline items ---------------- */
  gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.from(item, {
      opacity: 0, x: -30, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 88%' }
    });
  });

  /* ---------------- Dashboard bars grow-in ---------------- */
  gsap.utils.toArray('.bars .bar').forEach(bar => {
    const h = bar.style.height;
    gsap.from(bar, {
      height: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: bar, start: 'top 95%' }
    });
  });

  /* ---------------- Progress bars fill-in ---------------- */
  gsap.utils.toArray('.progress-fill').forEach(fill => {
    const w = fill.style.width;
    gsap.fromTo(fill, { width: '0%' }, {
      width: w, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: fill, start: 'top 95%' }
    });
  });

  /* ---------------- Sidebar toggle (dashboard mobile) ---------------- */
  const sidebarToggle = document.querySelector('.dash-toggle');
  const sidebar = document.querySelector('.dash-sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  /* ---------------- Filter tag active state (Cars page) ---------------- */
  document.querySelectorAll('.filter-tags button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---------------- Auth tab toggle ---------------- */
  document.querySelectorAll('.auth-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

});
