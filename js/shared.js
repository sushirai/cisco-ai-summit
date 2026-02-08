// ── Theme Toggle & Burger Menu (shared across all pages) ──
(function() {
  const speakers = [
    { name:"Chuck Robbins", role:"CEO, Cisco", slug:"chuck-robbins" },
    { name:"Jeetu Patel", role:"EVP, Cisco", slug:"g2-patel" },
    { name:"Sam Altman", role:"CEO, OpenAI", slug:"sam-altman" },
    { name:"Lip-Bu Tan", role:"CEO, Intel", slug:"lip-bu-tan" },
    { name:"Dylan Field", role:"CEO, Figma", slug:"dylan-field" },
    { name:"Aaron Levie", role:"CEO, Box", slug:"aaron-levie" },
    { name:"Kevin Scott", role:"CTO, Microsoft", slug:"kevin-scott" },
    { name:"TK", role:"Founder, Humane", slug:"tk-humane" },
    { name:"Matt Garman", role:"CEO, AWS", slug:"matt-garman" },
    { name:"Neuberger & McGurk", role:"Geopolitics Panel", slug:"anne-neuberger" },
    { name:"Marc Andreessen", role:"GP, a16z", slug:"marc-andreessen" }
  ];

  // Detect depth
  const isRoot = !location.pathname.match(/\/speakers\//);
  const prefix = isRoot ? 'speakers/' : '';
  const indexHref = isRoot ? 'index.html' : '../index.html';

  // Detect current speaker
  const currentSlug = document.body.getAttribute('data-current-speaker') || '';

  // ── Theme ──
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

  // ── Inject burger button into .nav-center ──
  const navCenter = document.querySelector('.top-bar .nav-center') || document.querySelector('.top-bar.overview-bar');
  if (navCenter) {
    const burger = document.createElement('button');
    burger.className = 'burger-btn';
    burger.setAttribute('aria-label', 'Open speaker menu');
    burger.innerHTML = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect y="2" width="18" height="2" rx="1" fill="currentColor"/><rect y="8" width="18" height="2" rx="1" fill="currentColor"/><rect y="14" width="18" height="2" rx="1" fill="currentColor"/></svg>';
    navCenter.insertBefore(burger, navCenter.firstChild);
  }

  // ── Inject theme toggle into .nav-next or top-bar ──
  const sunSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const moonSVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.setAttribute('aria-label', 'Toggle theme');
  themeBtn.innerHTML = savedTheme === 'light' ? moonSVG : sunSVG;

  // Place it: in nav-next if exists, else append to top-bar
  const navNext = document.querySelector('.top-bar .nav-next');
  const topBar = document.querySelector('.top-bar');
  if (navNext) {
    navNext.appendChild(themeBtn);
  } else if (topBar) {
    themeBtn.style.position = 'absolute';
    themeBtn.style.right = '40px';
    topBar.style.position = 'sticky'; // ensure relative positioning context
    topBar.appendChild(themeBtn);
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      themeBtn.innerHTML = sunSVG;
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeBtn.innerHTML = moonSVG;
    }
  });

  // ── Burger Menu Panel ──
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';

  const panel = document.createElement('div');
  panel.className = 'menu-panel';
  panel.innerHTML = `
    <div class="menu-header">
      <span class="menu-title">All Speakers</span>
      <button class="menu-close" aria-label="Close menu">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg>
      </button>
    </div>
    <nav class="menu-list">
      <a href="${indexHref}" class="menu-item menu-item-overview${isRoot ? ' active' : ''}">
        <span class="menu-item-name">← Overview</span>
      </a>
      ${speakers.map(s => `<a href="${prefix}${s.slug}.html" class="menu-item${s.slug === currentSlug ? ' active' : ''}">
        <span class="menu-item-name">${s.name}</span>
        <span class="menu-item-role">${s.role}</span>
      </a>`).join('')}
    </nav>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  function openMenu() { overlay.classList.add('open'); panel.classList.add('open'); }
  function closeMenu() { overlay.classList.remove('open'); panel.classList.remove('open'); }

  const burgerBtn = document.querySelector('.burger-btn');
  if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  panel.querySelector('.menu-close').addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();
