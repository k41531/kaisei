import ArticleList from "../components/atoms/ArticleList.tsx";
import SectionCard from "../components/atoms/SectionCard.tsx";
import Layout from "../components/layout.tsx";
import type Article from "../models/article.ts";
import { UnifiedPostRepository } from "../repositries/post-repository.ts";
import { createDefine, page } from "fresh";

const define = createDefine<Article[]>();


export const handler = define.handlers({
  async GET() {
    const postRepo = new UnifiedPostRepository();

    const posts = await postRepo.getPosts();

    return page(posts);
  },
});

export default define.page<typeof handler>(function Home({ data }) {
  return (
    <Layout title="Articles" description="The homepage of Kaisei, an engineer.">
      <SectionCard title="All articles">
        <ArticleList articles={data} />
      </SectionCard>
    </Layout>
  );
});
