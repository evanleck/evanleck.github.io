export const layout = "layouts/archive.tsx";
export const title = "Archive";

export default function* ({ search, paginate }: Lume.Data) {
	const posts = search.pages("type=post", "date=desc");

	for (const data of paginate(posts, { url, size: 5 })) {
		yield data;
	}
}

export function url(n: number) {
	if (n === 1) {
		return "/archive.html";
	}

	return `/archive/${n}.html`;
}
