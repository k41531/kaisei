import type { PageProps } from "fresh";
import ArticleList from "../components/atoms/ArticleList.tsx";
import SectionCard from "../components/atoms/SectionCard.tsx";
import Layout from "../components/layout.tsx";
import type Article from "../models/article.ts";
import { UnifiedPostRepository } from "../repositries/post-repository.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers<Article[] | null> = {
  async GET(ctx) {
    const postRepo = new UnifiedPostRepository();

    const posts = await postRepo.getPosts();

    return ctx.render(posts);
  },
};

export default function Articles({ data }: PageProps<Article[] | null>) {
  return (
    <Layout title="Articles" description="The homepage of Kaisei, an engineer.">
      <SectionCard title="All articles">
        <ArticleList articles={data} />
      </SectionCard>
    </Layout>
  );
}
