const SITE = 'https://kaisei.dev';

const ESCAPE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ESCAPE[ch]);
}

const THEME_SCRIPT = `(function () {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    /* ignore */
  }
})();`;

/**
 * Render a full HTML document for the static site.
 * @param {object} opts
 * @param {string} opts.title   Short title; prefixed with "Kaisei's ".
 * @param {string} opts.description  Meta/OGP description.
 * @param {string} [opts.lang]  html lang. Defaults to "en".
 * @param {string} body  Pre-rendered HTML to place inside <main>.
 * @param {string} path  Site-relative URL path (e.g. "/", "/posts/").
 * @param {string} [opts.extraHead]  Extra HTML appended inside <head>.
 * @returns {string}
 */
export function renderPage({
  title,
  description,
  lang = 'en',
  body = '',
  path = '/',
  extraHead = '',
}) {
  const pageTitle = `Kaisei's ${title}`;
  const url = SITE + (path.startsWith('/') ? path : `/${path}`);
  const desc = escapeHtml(description || '');

  return `<!DOCTYPE html>
<html lang="${escapeHtml(lang)}" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(url)}">
  <script>${THEME_SCRIPT}</script>
  <link rel="stylesheet" href="/styles/tokens.css">
  <link rel="stylesheet" href="/styles/components.css">
  <link rel="stylesheet" href="/styles/blog.css">
  <link rel="icon" href="/favicon.ico">
  ${extraHead}
</head>
<body>
  <header>
    <a class="ds-site-link" href="/">Kaisei</a>
    <nav>
      <a href="/posts/">Posts</a>
      <a href="/playgrounds/variable-font/">Playground</a>
    </nav>
    <button id="themeToggle" class="ds-btn" type="button" aria-label="Toggle theme">Toggle theme</button>
  </header>
  <main>
${body}
  </main>
  <footer>
    <span class="ds-footer-stamp">kaisei.dev — made with a plain build script</span>
  </footer>
  <script src="/theme.js" defer></script>
</body>
</html>
`;
}