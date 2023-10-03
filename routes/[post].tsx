import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.1.28/mod.ts";
import Layout from "../components/layout.tsx";

interface Data {
  content: string;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const content = await Deno.readTextFile("./posts/hello.md");
    const body = render(content);
    return ctx.render({ ...ctx.state, content: body });
  },
};

export default function GreetPage(props: PageProps<Data>) {
  const { post } = props.params;
  const { content } = props.data;

  return (
    <Layout title="Post" description="The homepage of Kaisei, an engineer.">
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <style jsx>
        {CSS}
      </style>
    </Layout>
  );
}
