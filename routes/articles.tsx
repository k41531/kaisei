import { Handlers, PageProps } from "$fresh/server.ts";
import SectionCard from "../components/atoms/SectionCard.tsx";

import Layout from "../components/layout.tsx";
import Article from "../models/article.ts";
import { LocalPostRepository, ZennPostRepository } from "../repositries/post-repository.ts";
import getPostMetadata from "../utils/post-metadata-getter.ts";


export const handler: Handlers<Article[] | null> = {
	async GET(_, ctx) {
		const localRepo = new LocalPostRepository();
		const zennRepo = new ZennPostRepository();

		const localPosts = await localRepo.getPosts();
		const zennPosts = await zennRepo.getPosts();

		const posts = [...localPosts, ...zennPosts];
		return ctx.render(posts);
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
										href={`${article.path}`}
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
