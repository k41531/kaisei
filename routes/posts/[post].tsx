import { CSS } from "gfm";
import { unified } from "https://esm.sh/unified@11.0.4";
import remarkParse from "https://esm.sh/remark-parse@11.0.0";
import remarkGfm from "https://esm.sh/remark-gfm@4.0.0";
import remarkRehype from "https://esm.sh/remark-rehype@11.0.0";
import rehypeStringify from "https://esm.sh/rehype-stringify@10.0.0";
import remarkFrontmatter from "https://esm.sh/remark-frontmatter@5.0.0";
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
