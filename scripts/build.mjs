import { readFile, readdir, copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';

import { getPosts, fetchZennPosts } from './post-utils.mjs';
import { renderPage } from './layout.mjs';
import { highlightCode } from './highlight.mjs';

const ROOT = process.cwd();
const postsDir = path.join(ROOT, 'src/posts');
const dist = path.join(ROOT, 'dist');
const srcStyles = path.join(ROOT, 'src/styles');
const publicDir = path.join(ROOT, 'public');

const SHELL = 'https://kaisei.dev';
const ESCAPE = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const escapeHtml = (v) => String(v).replace(/[&<>"']/g, (c) => ESCAPE[c]);

function formatDate(d) {
  if (!d) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`;
}

// ---- markdown-it with async-aware syntax highlighting ----------------------
const md = new MarkdownIt({ html: false, linkify: true, typographer: false });
const codeFence = [];

md.renderer.rules.fence = function (tokens, idx) {
  const t = tokens[idx];
  const lang = (t.info || '').trim().split(/\s+/)[0] || 'text';
  const n = codeFence.length;
  codeFence.push({ code: t.content, lang });
  return `\u0000SHIKI${n}\u0000`;
};

async function postprocessBody(body) {
  if (!/\u0000SHIKI\d+\u0000/.test(body)) return body;
  const results = await Promise.all(
    codeFence.map((b) => highlightCode(b.code, b.lang)),
  );
  return body.replace(/\u0000SHIKI(\d+)\u0000/g, (_, i) => {
    const idx = Number(i);
    const fenced = results[idx];
    if (fenced) return fenced;
    const b = codeFence[idx];
    return `<pre><code>${escapeHtml(b.code)}</code></pre>`;
  });
}

async function renderMarkdown(markdown) {
  codeFence.length = 0;
  const html = md.render(markdown);
  return postprocessBody(html);
}

// ---- asset copy -------------------------------------------------------------
async function copyDirTree(srcDir, destDir) {
  const entries = await readdir(srcDir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (e) => {
      const s = path.join(srcDir, e.name);
      const d = path.join(destDir, e.name);
      if (e.isDirectory()) {
        await mkdir(d, { recursive: true });
        await copyDirTree(s, d);
      } else {
        await copyFile(s, d);
      }
    }),
  );
}

// ---- page helpers -----------------------------------------------------------
async function writePage(relPath, html) {
  const dir = path.join(dist, relPath);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

function postRow(entry) {
  const date = formatDate(entry.publishedAt);
  const title = escapeHtml(entry.title ?? '');
  return `<a class="post-row" href="${escapeHtml(entry.path)}">
  <span class="post-date">${date}</span>
  <span class="post-title">${title}</span>
</a>`;
}

function rowsHtml(entries) {
  return entries.map(postRow).join('\n');
}

const ABOUT_HTML = `
<section class="ds-card" aria-label="About">
  <div class="ds-card__head">
    <h2 class="ds-card__title">About</h2>
    <span class="ds-card__meta">kaisei.dev</span>
  </div>
  <div class="ds-card__body about-body">
    <p><span class="label">Name</span><span class="about-value">Kaisei</span></p>
    <p><span class="label">Email</span><a class="about-value" href="mailto:me@kaisei.dev">me@kaisei.dev</a></p>
    <p><span class="label">GitHub</span><a class="about-value" target="_blank" rel="noopener" href="https://github.com/k41531">github.com/k41531</a></p>
    <p><span class="label">X</span><a class="about-value" target="_blank" rel="noopener" href="https://x.com/k41531">x.com/k41531</a></p>
    <p><span class="label">Zenn</span><a class="about-value" target="_blank" rel="noopener" href="https://zenn.dev/k41531">zenn.dev/k41531</a></p>
  </div>
</section>`;

function tagsHtml(tags) {
  if (!tags || tags.length === 0) return '';
  return `<div class="post-tags">${tags
    .map((t) => `<span class="ds-badge">${escapeHtml(String(t))}</span>`)
    .join('')}</div>`;
}

async function postArticleHtml(post) {
  const raw = await readFile(path.join(postsDir, post.file), 'utf-8');
  const { content } = matter(raw);
  // 記事タイトルはフロントマッターから別途 <h1> で描画するため、
  // 本文先頭の H1（タイトル行）は除去して重複を防ぐ
  const contentWithoutLeadingH1 = content.replace(/^\s*# [^\n]*\n+/, '');
  const body = await renderMarkdown(contentWithoutLeadingH1);

  const emoji = post.emoji ? `${post.emoji} ` : '';
  const updated =
    post.updated &&
    post.publishedAt &&
    formatDate(post.updated) !== formatDate(post.publishedAt)
      ? `<p class="post-updated">Updated ${formatDate(post.updated)}</p>`
      : '';

  return `<h1>${emoji}${escapeHtml(post.title ?? '')}</h1>
<p class="post-date-line">${formatDate(post.publishedAt)}</p>
${updated}
${tagsHtml(post.tags)}
<div class="markdown-body">${body}</div>`;
}

// ---- playground ------------------------------------------------------------
const PLAYGROUND_HTML = `
<section class="playground">
  <h1>Variable Font</h1>
  <p>Play with the Source Serif 4 Variable font's optical axes and size.</p>
  <div class="sliders">
    <label>weight <input type="range" id="w" min="300" max="700" value="400"></label>
    <label>opsz <input type="range" id="o" min="8" max="144" value="16"></label>
    <label>size <input type="range" id="s" min="24" max="96" value="48"></label>
  </div>
  <p id="readout">wght 400, opsz 16, size 48</p>
  <p id="pv">Variable</p>
</section>
<script src="/playgrounds/variable-font.js" defer></script>`;

// ---- main ------------------------------------------------------------------
async function main() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  // copy public assets
  await copyDirTree(publicDir, dist);

  // copy styles
  const stylesDest = path.join(dist, 'styles');
  await mkdir(stylesDest, { recursive: true });
  const cssFiles = (await readdir(srcStyles)).filter((f) => f.endsWith('.css'));
  for (const f of cssFiles) {
    await copyFile(path.join(srcStyles, f), path.join(stylesDest, f));
  }
  // ensure fonts subfolder if present
  const srcFonts = path.join(srcStyles, 'fonts');
  try {
    const fonts = await readdir(srcFonts);
    const fontsDest = path.join(stylesDest, 'fonts');
    await mkdir(fontsDest, { recursive: true });
    for (const f of fonts) {
      await copyFile(path.join(srcFonts, f), path.join(fontsDest, f));
    }
  } catch {
    /* fonts dir optional */
  }

  // collect content
  const local = getPosts().map((p) => ({
    title: p.title,
    publishedAt: p.publishedAt,
    path: `/posts/${p.slug}/`,
    file: p.slug,
    slug: p.slug,
    source: 'local',
  }));
  const zenn = (await fetchZennPosts()).map((z) => ({
    title: z.title ?? null,
    publishedAt: z.published_at ? new Date(z.published_at) : new Date(0),
    path: z.path,
    source: 'zenn',
  }));
  const allByDate = [...local, ...zenn].sort((a, b) => {
    const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
    const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
    if (tb !== ta) return tb - ta;
    if (a.source !== b.source) return a.source === 'local' ? -1 : 1;
    return String(a.file).localeCompare(String(b.file));
  });

  // 1. home
  const homeBody = `${ABOUT_HTML}

<section class="home-section">
  <h2 class="section-title">New posts</h2>
  <div class="post-list">${rowsHtml(allByDate.slice(0, 10))}</div>
</section>`;

  await writePage(
    '/',
    renderPage({
      title: 'Home',
      description: 'The homepage of Kaisei, an engineer.',
      body: homeBody,
      path: '/',
    }),
  );

  // 2. all posts
  await writePage(
    '/posts',
    renderPage({
      title: 'Posts',
      description: 'All posts by Kaisei.',
      body: `<h1 class="page-title">All posts</h1><div class="post-list">${rowsHtml(allByDate)}</div>`,
      path: '/posts/',
    }),
  );

  // 3. local post pages (canonical + legacy)
  const localPosts = getPosts();
  for (const post of localPosts) {
    const article = await postArticleHtml(post);
    const page = renderPage({
      title: post.title ?? '',
      description: post.description ?? '',
      body: `<article>${article}</article>`,
      path: `/posts/${post.slug}/`,
    });
    await writePage(`/posts/${post.slug}`, page);
    await writePage(`/posts/${post.file}`, page);
  }

  // 4. playground
  await writePage(
    '/playgrounds/variable-font',
    renderPage({
      title: 'Playground',
      description: 'A playground for variable fonts.',
      body: PLAYGROUND_HTML,
      path: '/playgrounds/variable-font/',
    }),
  );

  // 5. api/posts.json
  const apiJson = JSON.stringify(
    allByDate.map((e) => ({
      title: e.title ?? null,
      published_at: e.publishedAt ? e.publishedAt.toISOString() : null,
      path: e.source === 'zenn' ? e.path : `/posts/${e.slug}/`,
    })),
    null,
    2,
  );
  const apiDir = path.join(dist, 'api');
  await mkdir(apiDir, { recursive: true });
  await writeFile(path.join(apiDir, 'posts.json'), apiJson);

  // 6. rss.xml
  const rssItems = localPosts
    .slice(0, 20)
    .map((p) => {
      const pub = p.publishedAt.toUTCString();
      const link = `${SHELL}/posts/${p.slug}/`;
      return `  <item>
    <title>${escapeHtml(p.title ?? '')}</title>
    <link>${escapeHtml(link)}</link>
    <guid>${escapeHtml(link)}</guid>
    <pubDate>${escapeHtml(pub)}</pubDate>
    <description>${escapeHtml(p.description ?? '')}</description>
  </item>`;
    })
    .join('\n');
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kaisei</title>
    <link>${SHELL}/</link>
    <description>Kaisei's blog</description>
    <language>en</language>
${rssItems}
  </channel>
</rss>`;
  await writeFile(path.join(dist, 'rss.xml'), rss);

  // 7. sitemap.xml
  const urlEntries = [
    '/',
    '/posts/',
    ...localPosts.map((p) => `/posts/${p.slug}/`),
    '/playgrounds/variable-font/',
  ];
  const locs = urlEntries
    .map((p) => `  <url><loc>${SHELL}${p}</loc></url>`)
    .join('\n');
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs}
</urlset>`,
  );

  // 8. 404
  await writeFile(
    path.join(dist, '404.html'),
    renderPage({
      title: '404',
      description: 'Not found',
      body: `<p class="empty-state">page not found</p>`,
      path: '/404',
    }),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});