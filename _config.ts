import lume from "lume/mod.ts";

/* Plugins */
import cssnano from "npm:cssnano";
import date from "lume/plugins/date.ts";
import favicon from "lume/plugins/favicon.ts";
import feed from "lume/plugins/feed.ts";
import inline from "lume/plugins/inline.ts";
import jsx from "lume/plugins/jsx_preact.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import picture from "lume/plugins/picture.ts";
import postcss from "lume/plugins/postcss.ts";
import prism from "lume/plugins/prism.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import toc from "mdtoc/toc.ts";
import toml from "lume/plugins/toml.ts";
import robots from "lume/plugins/robots.ts";
import transformImages from "lume/plugins/transform_images.ts";

/* Prism syntaxes */
import "npm:prismjs@1.29.0/components/prism-coffeescript.js";
import "npm:prismjs@1.29.0/components/prism-makefile.js";
import "npm:prismjs@1.29.0/components/prism-nginx.js";
import "npm:prismjs@1.29.0/components/prism-ruby.js";
import "npm:prismjs@1.29.0/components/prism-scss.js";

const site = lume({
	src: "./src",
	prettyUrls: false,
});

site.remoteFile(
	"_includes/styles/prism.css",
	"https://unpkg.com/prism-themes@1.9.0/themes/prism-dracula.css",
);

site.copy("fonts");

const numberFormatter = new Intl.NumberFormat();
site.filter("number", (value) => numberFormatter.format(value));

const listFormatter = new Intl.ListFormat();
site.filter("list", (value) => listFormatter.format(value));

site.use(postcss());
site.hooks.addPostcssPlugin(cssnano);

site
	.use(toml())
	.use(resolveUrls())
	.use(slugifyUrls({ lowercase: true }))
	.use(toc({ anchor: false }))
	.use(jsx())
	.use(date())
	.use(picture())
	.use(transformImages())
	.use(prism())
	.use(favicon({
		input: "favicon.svg",
	}))
	.use(feed({
		output: ["/index.xml", "/index.json"],
		query: "type=post",
		sort: "date=desc",
		limit: 50,
		info: {
			title: "=site.title",
			description: "=site.description",
		},
		items: {
			title: "=title",
		},
	}))
	.use(inline({ attribute: "rel='stylesheet'" }))
	.use(minifyHTML({
		options: {
			keep_spaces_between_attributes: true,
		},
	}));

// List taken from https://github.com/ai-robots-txt/ai.robots.txt
site.use(robots({
	disallow: [
		"AdsBot-Google",
		"Amazonbot",
		"anthropic-ai",
		"Applebot-Extended",
		"AwarioRssBot",
		"AwarioSmartBot
		"Bytespider",
		"CCBot",
		"ChatGPT-User",
		"ClaudeBot",
		"Claude-Web",
		"cohere-ai",
		"DataForSeoBot",
		"Diffbot",
		"FacebookBot",
		"FriendlyCrawler",
		"Google-Extended",
		"GoogleOther",
		"GPTBot",
		"img2dataset",
		"ImagesiftBot",
		"magpie-crawler",
		"Meltwater",
		"omgili",
		"omgilibot",
		"peer39_crawler",
		"peer39_crawler/1.0",
		"PerplexityBot",
		"PiplBot",
		"scoop.it",
		"Seekr",
		"YouBot",
	],
}));

export default site;
