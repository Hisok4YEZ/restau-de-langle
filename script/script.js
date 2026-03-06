// Charger header et footer
window.addEventListener('DOMContentLoaded', () => {

  // ── HEADER ──────────────────────────────
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
      initHeader();
    });

  // ── FOOTER ──────────────────────────────
  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });

});

function initHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const isIndexPage = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname.endsWith('/');

  // Sur les pages sans hero, le header est toujours opaque
  if (!isIndexPage) {
    header.classList.add('opaque');
  }

  // Scroll : rendre le header opaque dès que l'on défile
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Appel initial

  // Mettre en surbrillance le lien actif
  const links = header.querySelectorAll('.nav-links a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === path) {
      link.style.color = '#c9943a';
    }
  });

  // ── HAMBURGER ───────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Fermer le menu en cliquant sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}
