export const layout = "layouts/category.tsx";

// Generate a page for each tag
export default function* ({ search }: Lume.Data) {
	const tags = search.values("tags", "type=post");

	for (const tag of tags) {
		yield {
			url: `/category/${tag}.html`,
			title: `Categorized “${tag}”`,
			type: "tag",
			query: `type=post '${tag}'`,
			tag,
		};
	}
}
