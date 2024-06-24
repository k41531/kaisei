import { unified } from 'https://esm.sh/unified@11.0.4';
import remarkParse from 'https://esm.sh/remark-parse@11.0.0';
import remarkFrontmatter from "https://esm.sh/remark-frontmatter@5.0.0";
import remarkStringfy from 'https://esm.sh/remark-stringify@11.0.0';
import extractFrontmatter from "../utils/frontmatter-extracter.ts";
import type Article from "../models/article.ts";

async function getPostMetadata(path: string) : Promise<Article>{
  const content = await Deno.readTextFile(path);
  const file = await unified()
    .use(remarkParse) 
    .use(remarkStringfy)
    .use(remarkFrontmatter, {type: 'yaml', marker: '-'})
    .use(extractFrontmatter)
    .process(content);

  const frontmatter = file.data.frontmatter as Record<string, unknown>;
  const metadata : Article = {
    title: frontmatter.title as string,
    path: path,
    published_at: frontmatter.published_at as string,
  };
  return metadata;
}

export default getPostMetadata