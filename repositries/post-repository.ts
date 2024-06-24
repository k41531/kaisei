import type Article from "../models/article.ts";
import getPostMetadata from "../utils/post-metadata-getter.ts";

export interface PostRepository {
  getPosts(): Promise<Article[]>;
  getPostsLimited(limit: number): Promise<Article[]>;
}

abstract class BasePostRepository implements PostRepository {
  abstract getPosts(): Promise<Article[]>;
  abstract getPostsLimited(limit: number): Promise<Article[]>;
}

export class ZennPostRepository extends BasePostRepository {
  private readonly apiUrl =
    "https://zenn.dev/api/articles?username=k41531&order=latest";

  getPosts(): Promise<Article[]> {
    return this.fetchArticles(this.apiUrl);
  }

  getPostsLimited(limit: number): Promise<Article[]> {
    const limitedApiUrl = `${this.apiUrl}&count=${limit}`;
    return this.fetchArticles(limitedApiUrl);
  }

  private async fetchArticles(url: string): Promise<Article[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch articles, status: ${response.status}`);
      }
      const { articles } = await response.json();
      return articles.map((article: Article) => ({
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

  getPosts(): Promise<Article[]> {
    return this.fetchLocalPosts();
  }

  getPostsLimited(limit: number): Promise<Article[]> {
    return this.fetchLocalPosts(limit);
  }

  private async fetchLocalPosts(limit?: number): Promise<Article[]> {
    try {
      const files = Deno.readDir(this.postsDirectory);
      const posts: Article[] = [];
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
