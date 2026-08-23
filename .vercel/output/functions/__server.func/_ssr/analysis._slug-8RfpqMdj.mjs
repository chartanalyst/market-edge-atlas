import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as listPublishedAnalyses } from "./analyses.functions-BviDkd_w.mjs";
import { n as SITE_IMAGE, s as absoluteUrl } from "./site-meta-CXKBvaoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analysis._slug-8RfpqMdj.js
var $$splitComponentImporter = () => import("./analysis._slug-Cbu7fUXB.mjs");
var Route = createFileRoute("/analysis/$slug")({
	loader: async ({ params }) => {
		const all = await listPublishedAnalyses();
		const analysis = all.find((a) => a.slug === params.slug);
		if (!analysis) throw notFound();
		return {
			analysis,
			all
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Analysis unavailable" }, {
			name: "robots",
			content: "noindex"
		}] };
		const a = loaderData.analysis;
		const title = `${a.pair} — ${a.title} | Technical Market Analyst`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: a.summary
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: a.summary
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: absoluteUrl(`/analysis/${a.slug}`)
				},
				{
					property: "og:image",
					content: a.coverImage.startsWith("https://") ? a.coverImage : SITE_IMAGE
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:image",
					content: a.coverImage.startsWith("https://") ? a.coverImage : SITE_IMAGE
				}
			],
			links: [{
				rel: "canonical",
				href: absoluteUrl(`/analysis/${a.slug}`)
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
