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
      <meta name="description" content="The homepage of Kaisei, an engineer.">
    </Head>
    <header>
      <h1 class="text-xl mb-1">Home</h1>
      <hr class="mb-4 border-black"/>
    </header>
    <main class="grid gap-4">
      <section>
        <h2 class="font-bold mb-1">
          About me
        </h2>
        <table>
          <thead>
            <tr>
              <th class="w-32">Item</th>
              <th>Value</th>
            </tr>
          </thead>
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
        <h2 class="font-bold mb-1">
          Post
        </h2>
        <table>
          <thead>
            <tr>
              <th class="w-32">Date</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {
                data?.map(article => (
                <tr>
                <td>{article.published_at.match(/\d+-\d+-\d+/)}</td>
                <td><a href={"https://zenn.dev"+article.path}>{article.title}</a></td>
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
