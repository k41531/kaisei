import { Handlers, PageProps } from "$fresh/server.ts";
import SectionCard from "../components/atoms/SectionCard.tsx";

import Layout from "../components/layout.tsx";

interface Article {
	title: string;
	path: string;
	published_at: string;
}

export const handler: Handlers<Article[] | null> = {
	async GET(_, ctx) {
		const resp = await fetch(
			"https://zenn.dev/api/articles?username=k41531&order=latest",
		);
		if (resp.status === 404) {
			return ctx.render(null);
		}
		const data = await resp.json();
		const articles = data.articles;
		return ctx.render(articles);
	},
};

export default function Articles({ data }: PageProps<Article[] | null>) {
	return (
		<Layout title="Articles" description="The homepage of Kaisei, an engineer.">
			<SectionCard title="All articles">
				<div>
					<div class="grid gap-3 content-center">
						{data?.map((article) => (
							<div class="flex gap-2 items-center">
								<div class="text-xs flex-shrink-0">
									{article.published_at.match(/\d+-\d+-\d+/)}
								</div>
								<div class="flex-grow truncate">
									<a
										class="truncate ..."
										href={`https://zenn.dev${article.path}`}
									>
										{article.title}
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</SectionCard>
		</Layout>
	);
}
