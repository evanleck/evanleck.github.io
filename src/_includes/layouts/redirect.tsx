export default function ({ redirect }: Lume.Data) {
	return (
		<html lang="en-us">
			<head>
				<meta charset="utf-8" />
				<title>{redirect}</title>
				<link rel="canonical" href={redirect} />
				<meta name="robots" content="noindex" />
				<meta http-equiv="refresh" content={`0; url=${redirect}`} />
			</head>
		</html>
	);
}
