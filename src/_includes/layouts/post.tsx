export const layout = "layouts/main.tsx";

export default function (data: Lume.Data) {
	const { comp, title, children, toc } = data;

	return (
		<article id="articleLayout" itemscope itemtype="http://schema.org/Article">
			<header>
				<h1 itemprop="name">{title}</h1>
				<comp.posts.meta post={data} />
			</header>

			<comp.posts.toc toc={toc} />

			<section itemprop="articleBody">
				{children}
			</section>
		</article>
	);
}
