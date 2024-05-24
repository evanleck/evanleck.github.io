export default function ({ comp, headingLevel, post }: Lume.Data) {
	const Heading = `h${headingLevel || 2}` as
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6";

	return (
		<article class="summary" itemscope itemtype="http://schema.org/Article">
			<header>
				<Heading itemprop="name">
					<a href={post.url}>
						{post.title}
					</a>
				</Heading>
			</header>
			<comp.posts.meta post={post} />
		</article>
	);
}
