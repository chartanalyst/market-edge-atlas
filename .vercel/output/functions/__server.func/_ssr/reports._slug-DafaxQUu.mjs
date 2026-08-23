import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getSiteContent } from "./content.functions-BOOXBVL8.mjs";
import { n as SITE_IMAGE, s as absoluteUrl } from "./site-meta-CXKBvaoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports._slug-DafaxQUu.js
var $$splitComponentImporter = () => import("./reports._slug-C_I1ad14.mjs");
var $$splitNotFoundComponentImporter = () => import("./reports._slug-nVdykrZP.mjs");
var $$splitErrorComponentImporter = () => import("./reports._slug-u9HAbNIN.mjs");
var Route = createFileRoute("/reports/$slug")({
	loader: async ({ params }) => {
		const content = await getSiteContent();
		const report = content.reports.find((r) => r.slug === params.slug);
		if (!report) throw notFound();
		return {
			report,
			all: content.reports
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Report unavailable" }, {
			name: "robots",
			content: "noindex"
		}] };
		const r = loaderData.report;
		const title = `${r.title} | Weekly Market Report`;
		const description = r.summary || `Weekly market report covering ${r.asset || r.market}.`;
		const meta = [
			{ title },
			{
				name: "description",
				content: description
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: description
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				property: "og:url",
				content: absoluteUrl(`/reports/${r.slug}`)
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		];
		if (r.coverImage.startsWith("https://")) {
			meta.push({
				property: "og:image",
				content: r.coverImage
			});
			meta.push({
				name: "twitter:image",
				content: r.coverImage
			});
		} else {
			meta.push({
				property: "og:image",
				content: SITE_IMAGE
			});
			meta.push({
				name: "twitter:image",
				content: SITE_IMAGE
			});
		}
		return {
			meta,
			links: [{
				rel: "canonical",
				href: absoluteUrl(`/reports/${r.slug}`)
			}]
		};
	},
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
