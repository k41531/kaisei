import type Post from "../../models/post.ts";

interface PostListProps {
  posts: Post[] | null;
}

export default function PostList(props: PostListProps) {
  return (
    <div class="grid gap-3 content-center">
      {props.posts?.map((post) => (
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
