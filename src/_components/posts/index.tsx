export default function ({ comp, headingLevel, posts }: Lume.Data) {
	return posts.map((post: Lume.Data) => (
		<comp.posts.summary headingLevel={headingLevel} post={post} />
	));
}
