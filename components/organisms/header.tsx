import SectionCard from "../atoms/SectionCard.tsx";

export default function Header() {
	return (
		<header>
			<SectionCard>
				<div class="flex justify-between items-center">
					<h1 class="text-md">
						<a href="/">Home</a>
					</h1>
					<div class="text-md">
						<a href="/articles">Articles</a>
					</div>
				</div>
			</SectionCard>
		</header>
	);
}
