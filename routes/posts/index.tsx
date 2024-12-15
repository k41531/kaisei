import PostList from "../../components/atoms/PostList.tsx";
import SectionCard from "../../components/atoms/SectionCard.tsx";
import Layout from "../../components/layout.tsx";
import type Post from "../../models/post.ts";
import { UnifiedPostRepository } from "../../repositries/post-repository.ts";
import { createDefine, page } from "fresh";

const define = createDefine<Post[]>();

export const handler = define.handlers({
  async GET() {
    const postRepo = new UnifiedPostRepository();

    const posts = await postRepo.getPosts();

    return page(posts);
  },
});

export default define.page<typeof handler>(function Home({ data }) {
  return (
    <Layout title="Posts" description="The homepage of Kaisei, an engineer.">
      <SectionCard title="All posts">
        <PostList posts={data} />
      </SectionCard>
    </Layout>
  );
});
