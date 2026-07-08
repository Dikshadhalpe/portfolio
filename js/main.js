/* ==========================================================================
   MAIN.JS — Diksha Dhalpe Portfolio
   All interactivity: cursor, navbar, typing, filters, modal, form, etc.
   ========================================================================== */

/* ─── Loader ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1500);
});

/* ─── Custom Cursor ───────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function animateCursor() {
    // dot snaps instantly
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    // ring follows with lerp
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  })();

  // Grow ring on hover of interactive elements
  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
})();

/* ─── Scroll Progress ─────────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  });
})();

/* ─── Navbar ─────────────────────────────────────────────────── */
(function initNavbar() {
  const nav       = document.getElementById('navbar');
  const ham       = document.getElementById('hamburger');
  const mMenu     = document.getElementById('mobile-menu');
  const closeBtn  = document.getElementById('menu-close');
  const links     = document.querySelectorAll('.nav-links a, .mobile-menu a');

  // Scrolled class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('back-to-top')?.classList.toggle('show', window.scrollY > 400);
  });

  // Hamburger
  ham?.addEventListener('click', () => mMenu.classList.add('open'));
  closeBtn?.addEventListener('click', () => mMenu.classList.remove('open'));

  // Close mobile menu on link click
  mMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mMenu.classList.remove('open')));

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => observer.observe(s));
})();

/* ─── Typing Animation ────────────────────────────────────────── */
(function initTyping() {
  const el     = document.getElementById('typed-text');
  const cursor = document.querySelector('.hero-typed-cursor');
  if (!el) return;

  const roles  = ['Java Developer', 'Web Developer', 'Open Source Enthusiast', 'Problem Solver', 'Full Stack Engineer'];
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    const word = roles[ri];
    if (!deleting) {
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, 1600); return; }
      setTimeout(tick, 80);
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 300); return; }
      setTimeout(tick, 40);
    }
  }
  tick();
})();

/* ─── Animated Counters ───────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const target = +e.target.dataset.target;
      const suffix = e.target.dataset.suffix || '';
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        e.target.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 22);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();

/* ─── Reveal on Scroll ────────────────────────────────────────── */
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
})();

/* ─── Skill bars animate in ───────────────────────────────────── */
(function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.skill-bar span').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skills-grid').forEach(g => obs.observe(g));
})();

/* ─── Skills Tabs ─────────────────────────────────────────────── */
(function initSkillsTabs() {
  document.querySelectorAll('.skills-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      document.querySelectorAll('.skill-card').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ─── Projects ────────────────────────────────────────────────── */
(function initProjects() {
  const grid   = document.getElementById('projects-grid');
  const search = document.getElementById('project-search');
  if (!grid || typeof projectsData === 'undefined') return;

  let currentFilter = 'all';

  // Render cards
  function renderCards() {
    const query = (search?.value || '').toLowerCase();
    grid.innerHTML = '';
    projectsData.forEach(p => {
      const matchFilter = currentFilter === 'all' || p.category.map(c => c.toLowerCase()).includes(currentFilter.toLowerCase());
      const matchSearch = p.title.toLowerCase().includes(query) || p.techStack.join(' ').toLowerCase().includes(query);
      if (!matchFilter || !matchSearch) return;

      const card = document.createElement('div');
      card.className = 'glass project-card';
      card.dataset.id = p.id;
      const statusClass = p.status === 'In Progress' ? 'progress' : '';
      card.innerHTML = `
        <div class="project-thumb">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <span class="project-status ${statusClass}">${p.status}</span>
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-tags">${p.techStack.map(t => `<span>${t}</span>`).join('')}</div>
          <div class="project-actions">
            ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-outline btn-sm" onclick="event.stopPropagation()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              GitHub</a>` : ''}
            ${p.demo ? `<a href="${p.demo}" target="_blank" class="btn btn-outline btn-sm" onclick="event.stopPropagation()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Demo</a>` : ''}
            <button class="btn btn-ghost btn-sm detail-btn">Details →</button>
          </div>
        </div>`;

      card.addEventListener('click', () => openModal(p));
      card.querySelector('.detail-btn')?.addEventListener('click', (e) => { e.stopPropagation(); openModal(p); });
      addRipple(card);
      grid.appendChild(card);
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderCards();
    });
  });

  search?.addEventListener('input', renderCards);
  renderCards();
})();

/* ─── Modal ───────────────────────────────────────────────────── */
const modalOverlay = document.getElementById('project-modal');

function openModal(p) {
  if (!modalOverlay) return;
  document.getElementById('modal-img').src = p.image;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent = p.longDescription || p.description;
  document.getElementById('modal-arch').textContent = p.architecture || '—';
  document.getElementById('modal-challenges').textContent = p.challenges || '—';
  document.getElementById('modal-features').innerHTML = (p.features || []).map(f => `<li>${f}</li>`).join('');
  document.getElementById('modal-stack').innerHTML = (p.techStack || []).map(t => `<span class="hero-tag">${t}</span>`).join('');
  document.getElementById('modal-future').textContent = p.futureImprovements || '—';
  const ghLink = document.getElementById('modal-gh');
  const dmLink = document.getElementById('modal-demo');
  if (ghLink) { ghLink.href = p.github || '#'; ghLink.style.display = p.github ? '' : 'none'; }
  if (dmLink) { dmLink.href = p.demo || '#'; dmLink.style.display = p.demo ? '' : 'none'; }
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);
modalOverlay?.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ─── Ripple Effect ───────────────────────────────────────────── */
function addRipple(el) {
  el.addEventListener('click', e => {
    const rect = el.getBoundingClientRect();
    const r = document.createElement('span');
    r.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
    el.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });
}
document.querySelectorAll('.btn').forEach(addRipple);

/* ─── Contact Form ────────────────────────────────────────────── */
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  // Confetti
  fireConfetti();
  e.target.reset();
  setTimeout(() => toast.classList.remove('show'), 4000);
});

/* ─── Confetti ────────────────────────────────────────────────── */
function fireConfetti() {
  const colors = ['#6C63FF', '#00E5FF', '#22C55E', '#FFFFFF', '#FF6B6B'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed; width:9px; height:9px; border-radius:50%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${Math.random()*100}vw; top:-10px; z-index:3000; pointer-events:none;
      animation: confettiFall ${1.2 + Math.random()}s ease forwards;
      animation-delay:${Math.random() * .4}s;
    `;
    document.body.appendChild(c);
    c.addEventListener('animationend', () => c.remove());
  }
  // inject keyframes once
  if (!document.getElementById('confetti-style')) {
    const s = document.createElement('style');
    s.id = 'confetti-style';
    s.textContent = `@keyframes confettiFall { to { transform: translateY(105vh) rotate(720deg); opacity:0; } }`;
    document.head.appendChild(s);
  }
}

/* ─── Back to top ─────────────────────────────────────────────── */
document.getElementById('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ─── Particles Canvas ────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => { resize(); initP(); });
  resize();

  function initP() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.6 + .4,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      alpha: Math.random() * .5 + .1,
    }));
  }
  initP();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─── Magnetic Buttons ────────────────────────────────────────── */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const dx   = e.clientX - rect.left - rect.width  / 2;
    const dy   = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translateY(-3px) translate(${dx * .12}px, ${dy * .12}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ─── Email copy button ───────────────────────────────────────── */
document.getElementById('copy-email')?.addEventListener('click', function() {
  navigator.clipboard.writeText('diksha.dhalpe@example.com').then(() => {
    this.textContent = 'Copied!';
    setTimeout(() => this.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy email`, 2000);
  });
});

/* ─── Parallax hero visual ────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const offset = window.scrollY * 0.22;
  const visual = hero.querySelector('.hero-visual');
  if (visual) visual.style.transform = `translateY(${offset}px)`;
});
