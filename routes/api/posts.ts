import { UnifiedPostRepository } from "../../repositries/post-repository.ts";
import { define } from "../../utils/state.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const url = new URL(ctx.req.url);
    const limit = url.searchParams.get("limit");
    
    const repository = new UnifiedPostRepository();
    let posts;
    
    if (limit && !isNaN(Number(limit))) {
      posts = await repository.getPostsLimited(Number(limit));
    } else {
      posts = await repository.getPosts();
    }
    
    return Response.json(posts);
  },
});
