import { Handlers, PageProps } from "$fresh/server.ts";
import SectionCard from "../components/atoms/SectionCard.tsx";
import SquareCard from "../components/atoms/SquareCard.tsx";
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
      <SectionCard title="About me">
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
      </SectionCard>
      <SectionCard title="New articles">
        <div>
          <div class="grid gap-3 content-center">
            {data?.map((article) => (
              <div class="flex gap-2 items-center">
                <div class="text-xs flex-shrink-0">
                  {article.published_at.match(/\d+-\d+-\d+/)}
                </div>
                <div class="flex-grow truncate">
                  <a
                    href={`https://zenn.dev${article.path}`}
                  >
                    {article.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Projects">
        <div class="grid grid-cols-4 gap-4 mt-4">
        <a href="https://www.raycast.com/k41531/snap-jot" alt="SnapJot(Raycast Extension)">
          <div class="rounded-md border-0 border-black shadow-md aspect-1/1">
            <div class="grid grid-rows-5">
              <div class="row-span-2 p-2">
                <p>SnapJot</p>
                <p class="text-xs whitespace-nowrap">Raycast Extension</p>
              </div>
              <img class="row-span-2 h-full mx-auto" src="/images/snap-jot.png" alt="snap-jot (raycast extension)" />
            </div>
          </div>
          </a>
        </div>
      </SectionCard>
    </Layout>
  );
}
