import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import rehypeStringify from "rehype-stringify";
import extractFrontmatter from "../../utils/frontmatter-extracter.ts";
import { page } from "fresh";
import { define } from "../../utils/state.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const { post } = ctx.params;
    const content = await Deno.readTextFile(`./posts/${post}`);
    const file = await unified()
      .use(remarkParse)
      .use(remarkFrontmatter, { type: "yaml", marker: "-" })
      .use(extractFrontmatter)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content);
    const frontmatter = file.data.frontmatter as Record<string, unknown>;

    ctx.state.title = frontmatter.title as string;
    ctx.state.description = frontmatter.description as string;

    return page({
      content: String(file),
      frontmatter: frontmatter,
    });
  },
});

export default define.page<typeof handler>(function GreetPage(props) {
  const { content } = props.data;
  return (
    <>
      <div
        className="markdown-body"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
});
