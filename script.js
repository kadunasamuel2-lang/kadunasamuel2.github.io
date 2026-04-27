/* ═══════════════════════════════════════════
   WebCraft Technologies — script.js v4.0
═══════════════════════════════════════════ */
'use strict';

/* ── 1. LOADER ─ hides after 1.8s NO MATTER WHAT ── */
document.body.style.overflow = 'hidden';

function hideLoader() {
  const l = document.getElementById('loader');
  if (!l) return;
  l.classList.add('gone');
  document.body.style.overflow = '';
  revealAll();
}
setTimeout(hideLoader, 1800);
setTimeout(hideLoader, 4000); // hard failsafe


/* ── 2. NAV SCROLL ────────────────────────── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);

  const btt = document.getElementById('btt');
  if (btt) btt.classList.toggle('show', window.scrollY > 400);

  setActiveLink();
  revealAll();
}, { passive: true });

function setActiveLink() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const links    = document.querySelectorAll('.nl');
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
  });
}


/* ── 3. HAMBURGER ─────────────────────────── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  drawer.classList.toggle('open');
});
function closeDrawer() {
  burger?.classList.remove('open');
  drawer?.classList.remove('open');
}
document.addEventListener('click', e => {
  if (nav && !nav.contains(e.target)) closeDrawer();
});


/* ── 4. SMOOTH SCROLL ─────────────────────── */
function goTo(sel) {
  const el = document.querySelector(sel);
  if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' }); }
    });
  });
});


/* ── 5. SCROLL REVEAL ─────────────────────── */
function revealAll() {
  document.querySelectorAll('[data-a]:not(.vis)').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 60) {
      const d = parseInt(el.dataset.d || 0);
      setTimeout(() => el.classList.add('vis'), d);
    }
  });
}

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.d || 0);
        setTimeout(() => e.target.classList.add('vis'), d);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  setTimeout(() => {
    document.querySelectorAll('[data-a]').forEach(el => io.observe(el));
  }, 1900);
}


/* ── 6. COUNTERS ──────────────────────────── */
function animCount(el) {
  const target = parseInt(el.dataset.t || 0);
  if (!target) return;
  let n = 0;
  const inc = Math.ceil(target / 55);
  const t = setInterval(() => {
    n = Math.min(n + inc, target);
    el.textContent = n;
    if (n >= target) clearInterval(t);
  }, 22);
}

const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animCount(e.target); cio.unobserve(e.target); }
  });
}, { threshold: 0.6 });

setTimeout(() => {
  document.querySelectorAll('.cnt').forEach(el => cio.observe(el));
}, 1900);


/* ── 7. PORTFOLIO PREVIEW MODAL ───────────── */
const DATA = {
  ecommerce: {
    title: 'E-commerce Store Preview',
    desc:  'See all 5 pages of your e-commerce website — homepage, products, cart, checkout & confirmation.',
    pkg:   'E-commerce Website',
    imgs:  [
      'images/ecommerce-showcase-1.jpg',
      'images/ecommerce-showcase-2.jpg',
      'images/ecommerce-showcase-3.jpg',
      'images/ecommerce-showcase-4.jpg',
      'images/ecommerce-showcase-5.jpg',
    ],
    fallbacks: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
      'https://images.unsplash.com/photo-1616499370260-485b3e5ed653?w=600&q=80',
    ]
  },
  church: {
    title: 'Church Website Preview',
    desc:  'See all 5 pages of your church website — homepage, sermons, events, giving & contact.',
    pkg:   'Church Website',
    imgs:  [
      'images/church-showcase-1.jpg',
      'images/church-showcase-2.jpg',
      'images/church-showcase-3.jpg',
      'images/church-showcase-4.jpg',
      'images/church-showcase-5.jpg',
    ],
    fallbacks: [
      'https://images.unsplash.com/photo-1438232992991-995b671e5695?w=600&q=80',
      'https://images.unsplash.com/photo-1574117122042-5e9e4f1c5f76?w=600&q=80',
      'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80',
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&q=80',
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80',
    ]
  },
  solar: {
    title: 'Solar Energy Company Preview',
    desc:  'See all 5 pages of your solar website — homepage, services, quote calculator, gallery & contact.',
    pkg:   'Solar Company Website',
    imgs:  [
      'images/solar-showcase-1.jpg',
      'images/solar-showcase-2.jpg',
      'images/solar-showcase-3.jpg',
      'images/solar-showcase-4.jpg',
      'images/solar-showcase-5.jpg',
    ],
    fallbacks: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=600&q=80',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80',
      'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80',
    ]
  }
};

let activePkg = '';

function showPreview(type) {
  const d = DATA[type];
  if (!d) return;
  activePkg = d.pkg;
  document.getElementById('mT').textContent = d.title;
  document.getElementById('mD').textContent = d.desc;

  // Build images — uses fallback Unsplash if local file missing
  const grid = document.getElementById('mI');
  grid.innerHTML = d.imgs.map((src, i) => `
    <img src="${src}"
         alt="${d.title} view ${i + 1}"
         loading="lazy"
         onerror="this.src='${d.fallbacks[i]}'" />
  `).join('');

  openM('prevModal');
}
function closeModal()    { closeM('prevModal'); }
function bookFromModal() { closeModal(); setTimeout(() => bookPackage(activePkg), 200); }


/* ── 8. BOOKING MODAL ─────────────────────── */
function bookPackage(name) {
  const label = name || 'Website Development';
  const el    = document.getElementById('sPkg');
  const wa    = document.getElementById('waLink');
  if (el) el.textContent = label;
  if (wa) wa.href = `https://wa.me/2349068759598?text=${encodeURIComponent(
    `Hello! I am interested in your ${label} service. Please share more details.`
  )}`;
  openM('bookModal');
}
function bookNow()      { bookPackage('Website Development Service'); }
function closeBooking() { closeM('bookModal'); }


/* ── 9. MODAL HELPERS ─────────────────────── */
function openM(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeM(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeBooking(); }
});


/* ── 10. KEYBOARD ACCESSIBLE CARDS ────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feat-card, .more-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });
});


/* ── 11. FAQ ──────────────────────────────── */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
} 