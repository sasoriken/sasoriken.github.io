/* sasoriken portfolio — main.js
 * Handles: i18n (JP/EN), URL query sync, localStorage, lang toggle UI,
 *          mobile menu, header scroll state, fade-in, works filter.
 * Vanilla JS only. No build step.
 */

(function () {
  'use strict';

  const SUPPORTED = ['ja', 'en'];
  const DEFAULT_LANG = 'ja';
  const STORAGE_KEY = 'sasoriken.lang';

  /* ------------------------------------------------------------------
   * Resolve site root prefix. Pages under /works/<slug>/ or /works/ etc.
   * need to load /i18n/*.json from the correct relative path.
   * ------------------------------------------------------------------ */
  function resolveSiteRoot() {
    const meta = document.querySelector('meta[name="site-root"]');
    if (meta && meta.content) return meta.content.replace(/\/$/, '') + '/';
    // Heuristic: count path depth.
    const segments = location.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    // Last segment is index.html or empty (after slash) — drop "index.html"
    if (segments.length > 0 && segments[segments.length - 1].endsWith('.html')) {
      segments.pop();
    }
    return '../'.repeat(segments.length) || './';
  }

  const ROOT = resolveSiteRoot();

  /* ------------------------------------------------------------------
   * Language resolution
   * ------------------------------------------------------------------ */
  function resolveInitialLang() {
    const url = new URL(location.href);
    const fromQuery = url.searchParams.get('lang');
    if (fromQuery && SUPPORTED.includes(fromQuery)) return fromQuery;
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('ja')) return 'ja';
    return 'en';
  }

  let currentLang = resolveInitialLang();
  let dict = null;

  async function loadDict(lang) {
    try {
      const res = await fetch(ROOT + 'i18n/' + lang + '.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('i18n fetch failed: ' + res.status);
      return await res.json();
    } catch (err) {
      console.warn('[i18n] Falling back to default lang:', err);
      if (lang !== DEFAULT_LANG) return loadDict(DEFAULT_LANG);
      return {};
    }
  }

  function applyDict(d) {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (d[key] != null) el.textContent = d[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const pairs = el.getAttribute('data-i18n-attr').split(';');
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s && s.trim());
        if (!attr || !key) return;
        if (d[key] != null) el.setAttribute(attr, d[key]);
      });
    });
    // language toggle UI state
    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      const lang = btn.getAttribute('data-lang-set');
      btn.setAttribute('aria-pressed', String(lang === currentLang));
    });
  }

  async function setLang(lang, opts) {
    opts = opts || {};
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    currentLang = lang;
    dict = await loadDict(lang);
    applyDict(dict);
    if (!opts.skipUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.toString());
    }
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function initLangToggle() {
    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-set');
        if (lang && lang !== currentLang) setLang(lang);
      });
    });
  }

  /* ------------------------------------------------------------------
   * Email link assembly (basic obfuscation: parts are stored in
   * data-attributes so the literal address never appears in HTML).
   * ------------------------------------------------------------------ */
  function initEmailLinks() {
    document.querySelectorAll('a[data-u][data-d]').forEach((a) => {
      const u = a.getAttribute('data-u');
      const d = a.getAttribute('data-d');
      if (!u || !d) return;
      a.setAttribute('href', 'mailto:' + u + '@' + d);
    });
  }

  /* ------------------------------------------------------------------
   * Mobile menu toggle
   * ------------------------------------------------------------------ */
  function initMenuToggle() {
    const btn = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    // Close when clicking a link
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------
   * Sticky header scroll state
   * ------------------------------------------------------------------ */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let ticking = false;
    function update() {
      if (window.scrollY > 64) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
   * Footer year
   * ------------------------------------------------------------------ */
  function initFooterYear() {
    const el = document.querySelector('[data-footer-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------
   * Fade-in on scroll (respects prefers-reduced-motion automatically
   * via CSS, but we also skip work if matched)
   * ------------------------------------------------------------------ */
  function initFadeIn() {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = document.querySelectorAll('.fade-in');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    nodes.forEach((n) => io.observe(n));
  }

  /* ------------------------------------------------------------------
   * Works filter (only on /works/index.html)
   * ------------------------------------------------------------------ */
  function initWorksFilter() {
    const list = document.querySelector('[data-works-list]');
    if (!list) return;
    const form = document.querySelector('[data-filter-form]');
    const meta = document.querySelector('[data-results-meta]');
    const emptyMsg = document.querySelector('[data-empty]');
    const resetBtn = document.querySelector('[data-filter-reset]');
    const items = Array.from(list.querySelectorAll('[data-card]'));

    function readChecks(group) {
      return Array.from(
        (form && form.querySelectorAll('input[data-group="' + group + '"]:checked')) || []
      ).map((i) => i.value);
    }

    function update() {
      const cats = readChecks('category');
      const stats = readChecks('status');
      const prices = readChecks('pricing');
      let shown = 0;
      items.forEach((card) => {
        const cat = card.dataset.category || '';
        const st = card.dataset.status || '';
        const pr = card.dataset.pricing || '';
        const okCat = !cats.length || cats.includes(cat);
        const okSt = !stats.length || stats.includes(st);
        const okPr = !prices.length || prices.includes(pr);
        const visible = okCat && okSt && okPr;
        card.style.display = visible ? '' : 'none';
        if (visible) shown += 1;
      });
      if (meta) meta.dataset.count = String(shown);
      if (meta) {
        const lbl = (dict && dict['works.results']) || '';
        meta.textContent = shown + ' / ' + items.length + ' ' + lbl;
      }
      if (emptyMsg) emptyMsg.hidden = shown !== 0;
    }

    if (form) {
      form.addEventListener('change', update);
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (form) {
          form.querySelectorAll('input[type="checkbox"]').forEach((cb) => { cb.checked = false; });
        }
        update();
      });
    }
    document.addEventListener('langchange', update);
    update();
  }

  /* ------------------------------------------------------------------
   * Secret room — hidden door.
   * Tapping the footer copyright 7 times within 3s opens the private
   * room at /room/. The room links to a credential-protected site, so
   * this is just a quiet, unadvertised entrance (no nav, no sitemap).
   * ------------------------------------------------------------------ */
  function initSecretRoom() {
    const knock = document.querySelector('.footer-copy');
    if (!knock) return;
    const NEEDED = 7;
    const WINDOW_MS = 3000;
    let count = 0;
    let timer = null;
    knock.style.cursor = 'default';
    knock.style.userSelect = 'none';
    knock.addEventListener('click', () => {
      count += 1;
      clearTimeout(timer);
      timer = setTimeout(() => { count = 0; }, WINDOW_MS);
      if (count >= NEEDED) {
        count = 0;
        clearTimeout(timer);
        location.href = ROOT + 'room/';
      }
    });
  }

  /* ------------------------------------------------------------------
   * Boot
   * ------------------------------------------------------------------ */
  function boot() {
    initEmailLinks();
    initLangToggle();
    initMenuToggle();
    initHeaderScroll();
    initFooterYear();
    initFadeIn();
    initSecretRoom();
    setLang(currentLang, { skipUrl: false }).then(() => {
      initWorksFilter();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
