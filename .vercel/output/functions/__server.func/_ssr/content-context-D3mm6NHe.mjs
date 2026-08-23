import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as defaultSiteContent } from "./site-content-DBTeyB_P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-context-D3mm6NHe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SiteContentContext = (0, import_react.createContext)(defaultSiteContent);
function SiteContentProvider({ value, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteContentContext.Provider, {
		value,
		children
	});
}
function useSiteContent() {
	return (0, import_react.useContext)(SiteContentContext);
}
//#endregion
export { useSiteContent as n, SiteContentProvider as t };
