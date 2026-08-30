// 最小 Worker: 静的アセット（dist/）を配信し、/api/posts は JSON として返す。
// 未知のパスには 404.html を返す
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API: 拡張子なしの /api/posts を posts.json に解決（旧ブログの URL 互換）
    if (url.pathname === "/api/posts") {
      const res = await env.ASSETS.fetch(
        new Request("https://kaisei.dev/api/posts.json"),
      );
      return new Response(res.body, {
        status: res.status,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    const res = await env.ASSETS.fetch(request);

    // 不明なパス（API クエリ以外）には専用 404 ページを返す
    if (res.status === 404 && !url.pathname.startsWith("/api/")) {
      try {
        const notFound = await env.ASSETS.fetch(
          new Request("https://kaisei.dev/404.html"),
        );
        return new Response(notFound.body, {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } catch {
        // fall through to the platform 404
      }
    }
    return res;
  },
};