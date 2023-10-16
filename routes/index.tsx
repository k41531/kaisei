import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/layout.tsx";


interface Article {
  title: string;
  path: string;
  published_at: string;
}

export const handler: Handlers<Article[] | null> = {
  async GET(_, ctx) {
    const resp = await fetch(
      "https://zenn.dev/api/articles?username=k41531&count=10&order=latest",
    );
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
    <Layout title="Home" description="The homepage of Kaisei, an engineer.">
      <section>
        <h2>
          About me
        </h2>
        <hr class="mb-4 border-foreground" />
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
              <td>
                <a href="https://github.com/k41531">github.com/k41531</a>
              </td>
            </tr>
            <tr>
              <td>X</td>
              <td>
                <a href="https://x.com/k41531">x.com/k41531</a>
              </td>
            </tr>
            <tr>
              <td>Zenn</td>
              <td>
                <a href="https://zenn.dev/k41531">zenn.dev/k41531</a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <div class="flex justify-between items-end">
        <h2>New posts</h2>
        <a class="text-xs" href={"/articles"}>more</a>
        </div>
        <hr class="mb-1 border-foreground" />
        <div>
          <div class="grid gap-3 content-center">
            {data?.map((article) => (
              <div class="flex gap-2 items-center">
                <div class="text-xs">
                  {article.published_at.match(/\d+-\d+-\d+/)}
                </div>
                <div>
                  <a
                    class="truncate ..."
                    href={"https://zenn.dev" + article.path}
                  >
                    {article.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
