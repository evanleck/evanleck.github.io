export const title = "Home!";

export default function (data: Lume.Data, _helpers: Lume.Helpers) {
	const postsLimit = 7;
	const posts = data.search.pages("type=post", "date=desc", postsLimit);

	return (
		<>
			<h1 id="indexHeading">
				Hi, I'm <span>Evan</span>
			</h1>
			<p style="text-align: center;">
				{data.site.description}
			</p>
			<hr class="spacerTop" />
			<h2>Recent Posts</h2>
			<data.comp.posts.index headingLevel={3} posts={posts} />

			<div class="visualSpacer visuallyQuiet spacerTop" />

			<p class="spacerTop" style="text-align: center">
				See more in the <a href="/archive.html">Archive</a>
			</p>
		</>
	);
}
