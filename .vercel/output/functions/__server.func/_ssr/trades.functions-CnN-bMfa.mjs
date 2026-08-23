import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as createSsrRpc } from "./createSsrRpc-vr7yBYzy.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { Ft as numberType, It as objectType, Lt as stringType, Nt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trades.functions-CnN-bMfa.js
function emptyTrade() {
	return {
		id: "",
		externalId: "",
		date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		market: "Crypto",
		instrument: "",
		direction: "Long",
		entry: "",
		exit: "",
		rMultiple: 0,
		percentage: 0,
		result: "Win",
		notes: "",
		screenshot: "",
		published: true
	};
}
function computeMetrics(trades) {
	const sorted = [...trades].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
	let running = 0;
	const equityCurve = sorted.map((t) => {
		running += t.rMultiple;
		return {
			date: t.date,
			equity: Number(running.toFixed(2))
		};
	});
	const totalTrades = sorted.length;
	const totalR = sorted.reduce((s, t) => s + t.rMultiple, 0);
	const wins = sorted.filter((t) => t.rMultiple > 0).length;
	const totalPnlPct = sorted.reduce((s, t) => s + t.percentage, 0);
	return {
		totalTrades,
		totalR: Number(totalR.toFixed(2)),
		avgR: totalTrades ? Number((totalR / totalTrades).toFixed(2)) : 0,
		winRate: totalTrades ? Number((wins / totalTrades * 100).toFixed(1)) : 0,
		totalPnlPct: Number(totalPnlPct.toFixed(2)),
		netPerformanceR: Number(totalR.toFixed(2)),
		equityCurve: equityCurve.length > 0 ? equityCurve : [{
			date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			equity: 0
		}]
	};
}
function equitySeriesForChart(trades) {
	const metrics = computeMetrics(trades);
	const live = metrics.equityCurve.map((p) => p.equity);
	const empty = trades.length === 0;
	return {
		series: live[0] === 0 ? live : [0, ...live],
		endR: metrics.netPerformanceR,
		fromSeed: empty
	};
}
var tradeSchema = objectType({
	id: stringType().max(60).optional().default(""),
	externalId: stringType().max(160).optional().default(""),
	date: stringType().max(30),
	market: stringType().max(60).default("Crypto"),
	instrument: stringType().trim().min(1).max(80),
	direction: stringType().max(20).default("Long"),
	entry: stringType().max(80).default(""),
	exit: stringType().max(80).default(""),
	rMultiple: numberType(),
	percentage: numberType().default(0),
	result: stringType().max(40).default("Win"),
	notes: stringType().max(4e3).default(""),
	screenshot: stringType().max(500).default(""),
	published: booleanType().default(true)
});
var importTradesSchema = objectType({
	text: stringType().min(1).max(15e5),
	replaceExistingSynced: booleanType().default(false)
});
/** Single trade by id — admin only. */
var getTrade = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(createSsrRpc("3ad37cf53280fdd11c4472a074cbfca68524b4104d757874151788372d474819"));
/** Journal metrics — admin (all trades). */
var getJournalMetrics = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("97d76a4822e60b44f62fc5ed587674247ca3d96747d5836f13d81c192f4647bb"));
createServerFn({ method: "GET" }).handler(createSsrRpc("7f0aae08ab276d0dce3fb3b5286b2d9e648477e5bef16aea30411c29197811cf"));
/** Published trades for the public journal. */
var listPublishedTrades = createServerFn({ method: "GET" }).handler(createSsrRpc("bdd876760703ab3d88b81dd10cf5462a42ba4c02a76a6b855d43ee8980ccc334"));
var listAllTrades = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("6a869386e23d10c8a21042ee2f0d8b5c158e158f6dddb07c4da3d8e3e4176219"));
var saveTrade = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => tradeSchema.parse(input)).handler(createSsrRpc("b2ef8847aaa421051c61dececb15d9e1f4416aa2bcd208f6db49be447ca3fdd8"));
var importTradesFromCsv = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => importTradesSchema.parse(input)).handler(createSsrRpc("ef1420853d5952c933143fa37ff46960e41af3cb4199da971cb382289d53863d"));
var deleteTrade = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(createSsrRpc("49cd47429eb0ced97755f24174fdc7521364367f89db71eb21ff581e859f3074"));
//#endregion
export { getJournalMetrics as a, listAllTrades as c, equitySeriesForChart as i, listPublishedTrades as l, deleteTrade as n, getTrade as o, emptyTrade as r, importTradesFromCsv as s, computeMetrics as t, saveTrade as u };
