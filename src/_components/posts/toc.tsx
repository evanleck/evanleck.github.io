import { Node } from "mdtoc/toc/mod.ts";

export default function ({ toc }: Lume.Data) {
	return (
		<>
			{toc?.length > 0 && (
				<div id="postTableOfContents">
					<h2>Table of Contents</h2>
					<ol>
						{toc.map((item: Node) => (
							<li>
								<a href={`#${item.slug}`}>{item.text}</a>

								{item.children.length > 0 && (
									<ul>
										{item.children.map((child) => (
											<li>
												<a href={`#${child.slug}`}>{child.text}</a>
											</li>
										))}
									</ul>
								)}
							</li>
						))}
					</ol>
				</div>
			)}
		</>
	);
}
