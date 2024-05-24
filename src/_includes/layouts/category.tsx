export const layout = "layouts/main.tsx";

export default function ({ comp, search, query, title }: Lume.Data) {
	const posts = search.pages(query);

	return (
		<>
			<header>
				<h1>{title}</h1>
			</header>
			<hr />
			<comp.posts.index posts={posts} />
		</>
	);
}
