import { Handlers, PageProps } from "$fresh/server.ts";
import GlassCard from "../components/atoms/GlassCard.tsx";
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
      <GlassCard>
        <h2>
          About me
        </h2>
        <hr class="mb-1 border-foreground" />
        <div class="grid">
          <div class="flex">
            <div class="w-20">Name</div>
            <div>Kaisei</div>
          </div>
          <div class="flex">
            <div class="w-20">Email</div>
            <div>me@kaisei.dev</div>
          </div>
          <div class="flex">
            <div class="w-20">GitHub</div>
            <div>
              <a href="https://github.com/k41531">github.com/k41531</a>
            </div>
          </div>
          <div class="flex">
            <div class="w-20">X</div>
            <div>
              <a href="https://x.com/k41531">x.com/k41531</a>
            </div>
          </div>
          <div class="flex">
            <div class="w-20">Zenn</div>
            <div>
              <a href="https://zenn.dev/k41531">zenn.dev/k41531</a>
            </div>
          </div>
        </div>
      </GlassCard>
      <GlassCard>
        <div class="flex justify-between items-end">
          <h2>New articles</h2>
        </div>
        <hr class="mb-1 border-foreground" />
        <div>
          <div class="grid gap-3 content-center">
            {data?.map((article) => (
              <div class="flex gap-2 items-center">
                <div class="text-xs flex-shrink-0">
                  {article.published_at.match(/\d+-\d+-\d+/)}
                </div>
                <div class="flex-grow truncate">
                  <a
                    href={"https://zenn.dev" + article.path}
                  >
                    {article.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </Layout>
  );
}
