import { PageProps, Handlers } from "$fresh/server.ts";
import { CSS, render } from "https://deno.land/x/gfm@0.1.28/mod.ts";


interface Data{
    content: string;
}

export const handler: Handlers<Data> = { 
    async GET(_req, ctx) {
        const content = await Deno.readTextFile('./posts/hello.md');
        const body = render(content);
        return ctx.render({ ...ctx.state, content: body });
      },
  };
  
export default function GreetPage(props: PageProps<Data>) {
  const { post } = props.params;
  const { content } = props.data;
    
  return (
  <>
    <main className="markdown-body">
      <p>Greetings to you, {post}!</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
    <style jsx>{CSS}</style>
  </>
  );
}