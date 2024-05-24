export default function (
	{ children, site, title }: Lume.Data,
	_helpers: Lume.Helpers,
) {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>{title} &middot; {site.title}</title>
				<link rel="stylesheet" href="/styles.css" />
				<link rel="me" href="https://pdx.social/@evanleck" />
				<link
					rel="alternate"
					type="application/rss+xml"
					href="/index.xml"
					title={site.title}
				/>
			</head>
			<body>
				<header id="layoutHeader">
					<nav class="flex-between">
						<div>
							<a id="layoutHomeLink" href="/">{site.title}</a>
						</div>

						<div id="layoutNavigation">
							<a href="/archive.html">Archive</a>
							<a href="/categories.tsx">Categories</a>
						</div>
					</nav>
				</header>
				<main id="layoutMain">
					{children}
				</main>
				<footer id="layoutFooter">
					<div>
						<p>&copy; {site.author}</p>
					</div>

					<div id="layoutSubscribe" class="visuallyQuiet">
						Subscribe via{" "}
						<a href="/index.xml">
							<abbr title="Really Simple Syndication">RSS</abbr>
						</a>{" "}
						or{" "}
						<a href="/index.json">
							<abbr title="JavaScript Object Notation">JSON</abbr>
						</a>
					</div>
				</footer>
			</body>
		</html>
	);
}
