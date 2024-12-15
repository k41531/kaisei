import { CSS } from "gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkFrontmatter from "remark-frontmatter";
import rehypeStringify from "rehype-stringify";
import extractFrontmatter from "../../utils/frontmatter-extracter.ts";
import Layout from "../../components/layout.tsx";
import { createDefine, page } from "fresh";

interface State {
  content: string;
  frontmatter: Record<string, unknown>;
}

const define = createDefine<State>();

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
    return page({
      content: String(file),
      frontmatter: frontmatter,
    });
  },
});

export default define.page<typeof handler>(function GreetPage(props) {
  const { content } = props.data;
  return (
    <Layout title="Post" description="The homepage of Kaisei, an engineer.">
      <div
        className="markdown-body"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx>{CSS}</style>
    </Layout>
  );
});
