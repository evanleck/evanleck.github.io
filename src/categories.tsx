export const title = "Categories";

export default function ({ search }: Lume.Data) {
	const tags = search.pages("type=tag", "tag");

	return (
		<>
			<header>
				<h1>{title}</h1>
			</header>
			<hr />
			<ul id="categoriesList" class="spacerTop">
				{tags.map((page) => (
					<li>
						<a href={page.url}>
							{page.tag}
						</a>
					</li>
				))}
			</ul>
		</>
	);
}
