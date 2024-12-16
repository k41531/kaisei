import PostList from "../../components/atoms/PostList.tsx";
import SectionCard from "../../components/atoms/SectionCard.tsx";
import { UnifiedPostRepository } from "../../repositries/post-repository.ts";
import { page } from "fresh";
import { define } from "../../utils/state.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const postRepo = new UnifiedPostRepository();
    const posts = await postRepo.getPosts();
    
    ctx.state.title = "Posts";
    ctx.state.description = "The homepage of Kaisei, an engineer.";

    return page(posts);
  },
});

export default define.page<typeof handler>(function Home({ data }) {
  return (
      <SectionCard title="All posts">
        <PostList posts={data} />
      </SectionCard>
  );
});
