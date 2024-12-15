import type Article from "../../models/article.ts";

interface ArticleListProps {
  articles: Article[] | null;
}

export default function ArticleList(props: ArticleListProps) {
  return (
    <div class="grid gap-3 content-center">
      {props.articles?.map((article) => (
        <div key={article.title} class="grid gap-2 grid-cols-6 items-center">
          <div class="text-xs col-span-1">
            {article.published_at.match(/\d+-\d+-\d+/)}
          </div>
          <div class="truncate col-span-5">
            <a href={`${article.path}`}>{article.title}</a>
          </div>
        </div>
      ))}
    </div>
  );
}
