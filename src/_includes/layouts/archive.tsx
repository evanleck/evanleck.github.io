import { url as archiveURL } from "@/archive.page.ts";

export const layout = "layouts/main.tsx";

export default function ({ comp, title, results, pagination }: Lume.Data) {
	const pageLinks = [];

	if (pagination) {
		for (let i = 1; i <= pagination.totalPages; i++) {
			if (i === pagination.page) {
				pageLinks.push(<span>{i}</span>);
			} else {
				pageLinks.push(<a href={archiveURL(i)}>{i}</a>);
			}
		}
	}

	const previous = pagination?.previous
		? <a href={pagination.previous} rel="prev">Previous</a>
		: <span>Previous</span>;

	const next = pagination?.next
		? <a href={pagination.next} rel="prev">Next</a>
		: <span>Next</span>;

	return (
		<>
			<header>
				<h1>{title}</h1>
			</header>
			<hr style="margin-bottom: var(--spacer);" />

			<comp.posts.index headingLevel={2} posts={results} />

			{pagination && (
				<>
					<div class="visualSpacer visuallyQuiet spacerTop" />

					<nav id="archivePagination" class="spacerTop">
						<ul>
							<li>{previous}</li>
							{pageLinks.map((link) => <li>{link}</li>)}
							<li>{next}</li>
						</ul>
					</nav>
				</>
			)}
		</>
	);
}
