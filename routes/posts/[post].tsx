import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "$gfm/mod.ts";
import { unified } from 'https://esm.sh/unified@11.0.4';
import remarkParse from 'https://esm.sh/remark-parse@11.0.0';
import remarkGfm from "https://esm.sh/remark-gfm@4.0.0";
import remarkRehype from 'https://esm.sh/remark-rehype@11.0.0';
import rehypeStringify from 'https://esm.sh/rehype-stringify@10.0.0';
import remarkFrontmatter from "https://esm.sh/remark-frontmatter@5.0.0";
import extractFrontmatter from "../../utils/frontmatter-extracter.ts";
import Layout from "../../components/layout.tsx";

interface Data {
	content: string;
	frontmatter: Record<string, unknown>;
}

export const handler: Handlers<Data> = {
	async GET(_req, ctx) {
		const content = await Deno.readTextFile("./posts/hello.md");
		const file = await unified()
			.use(remarkParse)
  		.use(remarkFrontmatter, {type: 'yaml', marker: '-'})
			.use(extractFrontmatter)
			.use(remarkGfm)
			.use(remarkRehype)
			.use(rehypeStringify)
			.process(content);
		const frontmatter = file.data.frontmatter as Record<string, unknown>;
		return ctx.render({ ...ctx.state, content: String(file), frontmatter: frontmatter});
	},
};

export default function GreetPage(props: PageProps<Data>) {
	const { content } = props.data;
	const { frontmatter } = props.data;
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
}
