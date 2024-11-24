import type { Handlers, PageProps } from "$fresh/server.ts";
import SectionCard from "../components/atoms/SectionCard.tsx";
import Layout from "../components/layout.tsx";
import { UnifiedPostRepository } from "../repositries/post-repository.ts";

interface Article {
  title: string;
  path: string;
  published_at: string;
}

export const handler: Handlers<Article[] | null> = {
  async GET(_, ctx) {
    const postRepo = new UnifiedPostRepository();
    const posts = await postRepo.getPostsLimited(10);
    return ctx.render(posts);
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
              <div key={article.title} class="grid gap-2 grid-cols-6 items-center">
                <div class="text-xs col-span-1">
                  {article.published_at.match(/\d+-\d+-\d+/)}
                </div>
                <div class="truncate col-span-5">
                  <a href={article.path}>{article.title}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Projects">
        <div class="grid grid-cols-4 ">
          <div class="grid gap-4 mt-4">
            <a
              href="https://k41531.github.io/2024-AdventCalendar/"
              alt="2024 Advent Calendar"
            >
              <div class="rounded-md aspect-1/1">
                <div class="grid grid-rows-5">
                  <div class="row-span-2 p-2">
                    <p>2024</p>
                    <p class="text-xs whitespace-nowrap">Advent Calendar</p>
                  </div>
                  <img
                    class="row-span-2 h-full mx-auto"
                    src="/images/advent-calendar-2024.png"
                    alt="advent-calendar-2024"
                  />
                </div>
              </div>
            </a>
          </div>
          <div class="grid gap-4 mt-4">
            <a
              href="https://www.raycast.com/k41531/snap-jot"
              alt="SnapJot(Raycast Extension)"
            >
              <div class="rounded-md aspect-1/1">
                <div class="grid grid-rows-5">
                  <div class="row-span-2 p-2">
                    <p>SnapJot</p>
                    <p class="text-xs whitespace-nowrap">Raycast Extension</p>
                  </div>
                  <img
                    class="row-span-2 h-full mx-auto"
                    src="/images/snap-jot.png"
                    alt="snap-jot (raycast extension)"
                  />
                </div>
              </div>
            </a>
          </div>
          <div class="grid gap-4 mt-4">
            <a
              href="https://k41531.github.io/2022-AdventCalendar"
              alt="2022 Advent Calendar"
            >
              <div class="rounded-md  aspect-1/1">
                <div class="grid grid-rows-5">
                  <div class="row-span-2 p-2">
                    <p>2022</p>
                    <p class="text-xs whitespace-nowrap">Advent Calendar</p>
                  </div>
                  <img
                    class="row-span-2 h-full mx-auto"
                    src="/images/advent-calendar-2022.png"
                    alt="advent-calendar-2022"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
      </SectionCard>
    </Layout>
  );
}
