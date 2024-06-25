import type { Handlers, PageProps } from "$fresh/server.ts";
import SectionCard from "../components/atoms/SectionCard.tsx";

import Layout from "../components/layout.tsx";
import type Article from "../models/article.ts";
import { UnifiedPostRepository } from "../repositries/post-repository.ts";

export const handler: Handlers<Article[] | null> = {
  async GET(_, ctx) {
    const postRepo = new UnifiedPostRepository();

    const posts = await postRepo.getPosts();

    return ctx.render(posts);
  },
};

export default function Articles({ data }: PageProps<Article[] | null>) {
  return (
    <Layout title="Articles" description="The homepage of Kaisei, an engineer.">
      <SectionCard title="All articles">
        <div>
          <div class="grid gap-3 content-center">
            {data?.map((article) => (
              <div key={article.title} class="flex gap-2 items-center">
                <div class="text-xs flex-shrink-0">
                  {article.published_at.match(/\d+-\d+-\d+/)}
                </div>
                <div class="flex-grow truncate">
                  <a class="truncate ..." href={`${article.path}`}>
                    {article.title}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </Layout>
  );
}
