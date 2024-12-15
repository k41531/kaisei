import type Post from "../models/post.ts";
import getPostMetadata from "../utils/post-metadata-getter.ts";

export interface PostRepository {
  getPosts(): Promise<Post[]>;
  getPostsLimited(limit: number): Promise<Post[]>;
}

abstract class BasePostRepository implements PostRepository {
  abstract getPosts(): Promise<Post[]>;
  abstract getPostsLimited(limit: number): Promise<Post[]>;
}

export class ZennPostRepository extends BasePostRepository {
  private readonly apiUrl =
    "https://zenn.dev/api/articles?username=k41531&order=latest";

  getPosts(): Promise<Post[]> {
    return this.fetchArticles(this.apiUrl);
  }

  getPostsLimited(limit: number): Promise<Post[]> {
    const limitedApiUrl = `${this.apiUrl}&count=${limit}`;
    return this.fetchArticles(limitedApiUrl);
  }

  private async fetchArticles(url: string): Promise<Post[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch articles, status: ${response.status}`);
      }
      const { articles } = await response.json();
      return articles.map((article: Post) => ({
        title: article.title,
        published_at: article.published_at,
        path: `https://zenn.dev${article.path}`,
      }));
    } catch (error) {
      console.error("Error fetching Zenn posts:", error);
      return [];
    }
  }
}

export class LocalPostRepository extends BasePostRepository {
  private readonly postsDirectory = "./posts";

  getPosts(): Promise<Post[]> {
    return this.fetchLocalPosts();
  }

  getPostsLimited(limit: number): Promise<Post[]> {
    return this.fetchLocalPosts(limit);
  }

  private async fetchLocalPosts(limit?: number): Promise<Post[]> {
    try {
      const files = Deno.readDir(this.postsDirectory);
      const posts: Post[] = [];
      let count = 0;
      for await (const file of files) {
        if (limit !== undefined && count >= limit) break;
        const post = await getPostMetadata(
          `${this.postsDirectory}/${file.name}`,
        );
        posts.push(post);
        count++;
      }
      return posts;
    } catch (error) {
      console.error("Error reading local posts:", error);
      return [];
    }
  }
}

export class UnifiedPostRepository implements PostRepository {
  private localRepo: LocalPostRepository;
  private zennRepo: ZennPostRepository;

  constructor() {
    this.localRepo = new LocalPostRepository();
    this.zennRepo = new ZennPostRepository();
  }

  async getPosts(): Promise<Post[]> {
    const localPosts = await this.localRepo.getPosts();
    const zennPosts = await this.zennRepo.getPosts();
    const posts = [...localPosts, ...zennPosts];
    return posts.sort((a, b) => {
      return (
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );
    });
  }

  async getPostsLimited(limit: number): Promise<Post[]> {
    const localPosts = await this.localRepo.getPostsLimited(limit);
    const zennPosts = await this.zennRepo.getPostsLimited(limit);
    const posts = [...localPosts, ...zennPosts];
    return posts
      .sort((a, b) => {
        return (
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
        );
      })
      .slice(0, limit);
  }
}
