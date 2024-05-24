import { renderToString } from "lume/deps/preact.ts";

export default function (
	{ post: { date, tags }, search }: Lume.Data,
	{ date: dateHelper, list }: Lume.Helpers,
) {
	const categoryLinks = tags?.map((tag: string) => {
		const page = search.page(`type=tag tag='${tag}'`);

		if (page) {
			return renderToString(<a href={page.url}>{tag}</a>);
		}
	});

	return (
		<div class="visuallyQuiet">
			<div class="flex-between">
				<time
					itemprop="datePublished"
					datetime={dateHelper(date, "DATE")}
				>
					{dateHelper(date, "HUMAN_DATE")}
				</time>
				<div
					dangerouslySetInnerHTML={{
						__html: `Categorized in ${list(categoryLinks)}.`,
					}}
				>
				</div>
			</div>
		</div>
	);
}
