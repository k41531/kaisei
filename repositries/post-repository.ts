import type Article from "../models/article.ts";
import getPostMetadata from "../utils/post-metadata-getter.ts";

export interface PostRepository {
  getPosts(): Promise<Article[]>;
  getPostLimited(limit: number): Promise<Article[]>;
}

class BasePostRepository implements PostRepository {
  getPosts(): Promise<Article[]> {
    throw new Error("Method not implemented.");
  }
  getPostLimited(_limit: number): Promise<Article[]> {
    throw new Error("Method not implemented.");
  }
}

export class ZennPostRepository extends BasePostRepository {
  private readonly apiUrl =
    "https://zenn.dev/api/articles?username=k41531&order=latest";

  async getPosts(): Promise<Article[]> {
    try {
      const response = await fetch(this.apiUrl);
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
  async getPostsLimited(limit: number): Promise<Article[]> {
    try {
      const limitedApiUrl = `${this.apiUrl}&count=${limit}`;
      const response = await fetch(limitedApiUrl);
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
      console.error("Error fetching Zenn posts with limit:", error);
      return [];
    }
  }
}

export class LocalPostRepository extends BasePostRepository {
  private readonly postsDirectory = "./posts";

  async getPosts(): Promise<Article[]> {
    try {
      const files = Deno.readDir(this.postsDirectory);
      const posts: Article[] = [];
      for await (const file of files) {
        const post = await getPostMetadata(
          `${this.postsDirectory}/${file.name}`,
        );
        posts.push(post);
      }
      return posts;
    } catch (error) {
      console.error("Error reading local posts:", error);
      return [];
    }
  }
  async getPostsLimited(limit: number): Promise<Article[]> {
    try {
      const files = Deno.readDir(this.postsDirectory);
      const posts: Article[] = [];
      let count = 0;
      for await (const file of files) {
        if (count >= limit) break;
        const post = await getPostMetadata(
          `${this.postsDirectory}/${file.name}`,
        );
        posts.push(post);
        count++;
      }
      return posts;
    } catch (error) {
      console.error("Error reading local posts with limit:", error);
      return [];
    }
  }
}
