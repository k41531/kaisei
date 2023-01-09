import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Article {
    title: string;
    path: string;
    published_at: string;
}


export const handler: Handlers<Article[] | null> = {
  async GET(_, ctx) {
    const resp = await fetch(`https://zenn.dev/api/articles?username=k41531&count=10&order=latest`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data = await resp.json();
    const articles = data.articles;
    return ctx.render(articles);
  },
};

export default function Home({ data }: PageProps<Article[] | null>) {
return (
  <body class="py-4 px-6">
    <Head>
      <title>Kaisei</title>
    </Head>
    <header>
      ~
      <hr class="my-4"/>
    </header>
    <main class="grid gap-3">
      <section>
        <h2 class="font-bold">
          About me
        </h2>
        <table>
          <tbody>
            <tr>
               <td>Name</td> 
               <td>Kaisei</td>
            </tr>
            <tr>
               <td>Email</td> 
               <td>me@kaisei.dev</td>
            </tr>
            <tr>
               <td>GitHub</td> 
               <td><a href="https://github.com/k41531">github.com/k41531</a></td>
            </tr>
            <tr>
               <td>Twitter</td> 
               <td><a href="https://twitter.com/k41531">twitter.com/k41531</a></td>
            </tr>
            <tr>
               <td>Blog</td> 
               <td><a href="https://zenn.dev/k41531">zenn.dev/k41531</a></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2 class="font-bold">
          Post
        </h2>
        <table>
          <tbody>
            {
                data?.map(article => (
                <tr>
                <td>{article.published_at.match(/\d+-\d+-\d+/)}</td>
                <td>{article.title}</td>
                </tr>
                ))
            }
          </tbody>
        </table>
        
      </section>
    </main>
  </body>
);
}
