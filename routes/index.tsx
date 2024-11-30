import type { Handlers, PageProps } from "$fresh/server.ts";
import SectionCard from "../components/atoms/SectionCard.tsx";
import Layout from "../components/layout.tsx";
import { UnifiedPostRepository } from "../repositries/post-repository.ts";
import InfoRow from "../components/atoms/InfoRow.tsx";
import ProjectCard from "../components/atoms/ProjectCard.tsx";

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
          <InfoRow label="Name" value="Kaisei" />
          <InfoRow label="Email" value="me@kaisei.dev" />
          <InfoRow
            label="GitHub"
            value={<a href="https://github.com/k41531">github.com/k41531</a>}
          />
          <InfoRow
            label="X"
            value={<a href="https://x.com/k41531">x.com/k41531</a>}
          />
          <InfoRow
            label="Zenn"
            value={<a href="https://zenn.dev/k41531">zenn.dev/k41531</a>}
          />
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
        <div class="grid grid-cols-4 gap-4 mt-4">
          <ProjectCard
            href="https://k41531.github.io/2024-AdventCalendar/"
            alt="2024 Advent Calendar"
            title="2024"
            subtitle="Advent Calendar"
            imgSrc="/images/advent-calendar-2024.png"
            imgAlt="advent-calendar-2024"
          />
          <ProjectCard
            href="https://www.raycast.com/k41531/snap-jot"
            alt="SnapJot(Raycast Extension)"
            title="SnapJot"
            subtitle="Raycast Extension"
            imgSrc="/images/snap-jot.png"
            imgAlt="snap-jot (raycast extension)"
          />
          <ProjectCard
            href="https://k41531.github.io/2022-AdventCalendar"
            alt="2022 Advent Calendar"
            title="2022"
            subtitle="Advent Calendar"
            imgSrc="/images/advent-calendar-2022.png"
            imgAlt="advent-calendar-2022"
          />
        </div>
      </SectionCard>
    </Layout>
  );
}
