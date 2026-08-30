import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const LINKS_DIR = path.resolve("src/posts");

export function parseFrontmatter(filePath) {
  return matter.read(filePath).data;
}

export function normalizeTags(v) {
  if (v === undefined || v === null) return [];
  if (Array.isArray(v)) return v;
  return [v];
}

export function parseDate(s) {
  if (typeof s !== "string" || !s.trim()) return null;
  const m = s.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{1,2}))?$/);
  if (!m) return null;
  const [, y, mo, d, h = 0, mi = 0] = m;
  // JST / Asia/Tokyo has no DST; fixed +09:00 offset.
  const ms = Date.UTC(
    +y, +mo - 1, +d, +h - 9, +mi, 0, 0,
  );
  return new Date(ms);
}

function firstParagraph(body) {
  const content = body
    .replace(/\r/g, "")
    // Drop the H1 heading line(s) (frontmatter already removed by gray-matter).
    .replace(/^#[^\n]*\n?/gm, "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter((p) => p.length > 0);
  return content[0] ?? "";
}

export function getPosts() {
  const files = fs
    .readdirSync(LINKS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const posts = files.map((file) => {
    const full = path.join(LINKS_DIR, file);
    const fileContent = fs.readFileSync(full, "utf-8");
    const parsed = matter(fileContent);
    const data = parsed.data ?? {};

    const publishedAt = parseDate(data.published_at) ?? parseDate(data.created);
    const created = parseDate(data.created);
    const updated = parseDate(data.updated);

    let description = data.description;
    if (description === undefined || description === null) {
      description = firstParagraph(parsed.content).slice(0, 160);
    }

    return {
      slug: path.basename(file, ".md"),
      file,
      title: data.title === undefined ? null : data.title,
      publishedAt,
      created,
      updated,
      tags: normalizeTags(data.tags),
      emoji: data.emoji === undefined || data.emoji === null ? null : data.emoji,
      topics: Array.isArray(data.topics) ? data.topics : [],
      description,
      hasCode: /(^|\n)```/m.test(fileContent),
    };
  });

  posts.sort((a, b) => {
    const ta = a.publishedAt ? a.publishedAt.getTime() : 0;
    const tb = b.publishedAt ? b.publishedAt.getTime() : 0;
    if (tb !== ta) return tb - ta;
    return a.file.localeCompare(b.file);
  });

  return posts;
}

export async function fetchZennPosts() {
  let res;
  try {
    res = await fetch("https://zenn.dev/api/articles?username=k41531&order=latest");
  } catch {
    return [];
  }
  if (!res.ok) return [];
  let json;
  try {
    json = await res.json();
  } catch {
    return [];
  }
  const articles = Array.isArray(json?.articles) ? json.articles : [];
  return articles.map((article) => {
    const p = typeof article?.path === "string" ? article.path : "";
    return {
      title: article?.title ?? null,
      published_at: article?.published_at ?? null,
      path: "https://zenn.dev" + (p.startsWith("/") ? p : "/" + p),
      source: "zenn",
    };
  });
}