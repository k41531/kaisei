import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkStringfy from "remark-stringify";
import extractFrontmatter from "../utils/frontmatter-extracter.ts";
import type Article from "../models/article.ts";

async function getPostMetadata(path: string): Promise<Article> {
  const content = await Deno.readTextFile(path);
  const file = await unified()
    .use(remarkParse)
    .use(remarkStringfy)
    .use(remarkFrontmatter, { type: "yaml", marker: "-" })
    .use(extractFrontmatter)
    .process(content);

  const frontmatter = file.data.frontmatter as Record<string, unknown>;
  const metadata: Article = {
    title: frontmatter.title as string,
    path: path,
    published_at: frontmatter.published_at as string,
  };
  return metadata;
}

export default getPostMetadata;
