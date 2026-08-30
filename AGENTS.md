# Blog (kaisei.dev)

Deno Fresh 時代の 136 記事を引き継ぎ、プレーン構成（build.mjs + markdown-it + kaisei/design）で再構築する。詳細は実装計画 2026-08-30_122016-blog-v2-workers.md 参照。

## コマンド
- build: `npm run build`
- 検証: `npm run build && npx wrangler dev`

## ローカルプレビュー（NUC）
`npx wrangler dev` を使う場合、node_modules の workerd バイナリが NixOS の動的リンカ制約で動かない。npm ci のたびに再パッチが必要:
  patchelf --set-interpreter /nix/store/*glibc*/lib/ld-linux-x86-64.so.2 node_modules/@cloudflare/workerd-linux-64/bin/workerd
（patchelf は hermes の nix profile に入っている）
