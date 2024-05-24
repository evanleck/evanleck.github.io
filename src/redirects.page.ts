export const layout = "layouts/redirect.tsx";

// Generate a page for each redirect/alias.
export default function* ({ search }: { search: Lume.Data["Searcher"] }) {
	const posts: Lume.Data[] = search.pages("type=post").filter((
		post: Lume.Data,
	) => post.aliases?.length > 0);

	for (const post of posts) {
		for (const alias of post.aliases) {
			yield {
				url: alias,
				redirect: post.url,
			};
		}
	}
}
