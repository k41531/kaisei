import { useEffect, useState } from "preact/hooks";
import type Post from "../models/post.ts";

interface PostListProps {
  limit?: number;
}

export default function PostList({ limit }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = limit ? `/api/posts?limit=${limit}` : "/api/posts";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit]);

  if (loading) {
    // Skeleton UI with the same structure as the post list
    return (
      <div class="grid gap-3 content-center">
        {Array.from({ length: limit || 5 }).map((_, index) => (
          <div key={index} class="grid gap-2 grid-cols-6 items-center animate-pulse">
            <div class="col-span-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="col-span-5 h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div class="grid gap-3 content-center">
      {posts?.map((post) => (
        <div key={post.title} class="grid gap-2 grid-cols-6 items-center">
          <div class="text-xs col-span-1">
            {post.published_at.match(/\d+-\d+-\d+/)}
          </div>
          <div class="truncate col-span-5">
            <a href={`${post.path}`}>{post.title}</a>
          </div>
        </div>
      ))}
    </div>
  );
}
