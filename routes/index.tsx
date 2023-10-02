import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Article {
    title: string;
    path: string;
    published_at: string;
}


export const handler: Handlers<Article[] | null> = {
  async GET(_, ctx) {
    const resp = await fetch('https://zenn.dev/api/articles?username=k41531&count=10&order=latest');
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
  <body class="py-4 px-6 max-w-xl mx-auto bg-dark-gray text-white">
    <Head>
      <title>Kaisei</title>
      <meta name="description" content="The homepage of Kaisei, an engineer."/>
    </Head>
    <header>
      <h1 class="text-xl mb-1">Home</h1>
      <hr class="mb-4 border-light-gray"/>
    </header>
    <main class="grid gap-4">
      <section>
        <h2>
          About me
        </h2>
        <hr class="mb-4 border-light-gray"/>
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
               <td>X</td> 
               <td><a href="https://x.com/k41531">x.com/k41531</a></td>
            </tr>
            <tr>
               <td>Blog(jp)</td> 
               <td><a href="https://zenn.dev/k41531">zenn.dev/k41531</a></td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>
          Zenn
        </h2>
        <hr class="mb-1 border-light-gray"/>
        <div>
          <div class="grid gap-3 content-center">
            {
                data?.map(article => (
                <div class="flex gap-2 items-center">
                <div class="text-xs">{article.published_at.match(/\d+-\d+-\d+/)}</div>
                <div ><a class="truncate ..." href={"https://zenn.dev"+article.path}>{article.title}</a></div>
                </div>
                ))
            }
          </div>
        </div>
      </section>
    </main>
  </body>
);
}
