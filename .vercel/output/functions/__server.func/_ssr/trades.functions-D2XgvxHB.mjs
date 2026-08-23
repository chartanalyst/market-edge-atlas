import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import "./live-poll-BjhnCmuD.mjs";
import { Ft as numberType, It as objectType, Lt as stringType, Nt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as ensureAdminAccess, r as loadAdminDb, t as adminContextFromHandler } from "./admin-guard-XTZOa6XH.mjs";
import { t as createPublicSupabase } from "./content.server-BlV6eceY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trades.functions-D2XgvxHB.js
function tradeFromRow(row) {
	return {
		id: String(row.id ?? ""),
		externalId: String(row.external_id ?? ""),
		date: String(row.date ?? "").slice(0, 10),
		market: String(row.market ?? ""),
		instrument: String(row.instrument ?? ""),
		direction: String(row.direction ?? "Long"),
		entry: String(row.entry ?? ""),
		exit: String(row.exit ?? ""),
		rMultiple: Number(row.r_multiple ?? 0),
		percentage: Number(row.percentage ?? 0),
		result: String(row.result ?? "Win"),
		notes: String(row.notes ?? ""),
		screenshot: String(row.screenshot ?? ""),
		published: row.published !== false
	};
}
var transactionCsvCache = null;
var DEMO_TRANSACTION_CSV = `external_id,date,market,instrument,direction,entry,exit,r_multiple,percentage,result,published,notes,screenshot
demo-2026-001,2026-07-01,Crypto,BTC/USD,Long,64250,66120,1.35,2.91,Win,true,Demo trend continuation from daily demand,
demo-2026-002,2026-07-03,Forex,EUR/USD,Short,1.0924,1.0961,-0.75,-0.34,Loss,true,Demo invalidation after London reversal,
demo-2026-003,2026-07-05,Stocks,NVDA,Long,128.40,134.90,2.1,5.06,Win,true,Demo earnings momentum continuation,
demo-2026-004,2026-07-08,Commodities,XAU/USD,Long,2342.20,2368.80,1.65,1.14,Win,true,Demo gold demand reclaim,
demo-2026-005,2026-07-11,Crypto,ETH/USD,Long,3380,3315,-0.9,-1.92,Loss,true,Demo failed breakout retest,
demo-2026-006,2026-07-15,Indices,SPX500,Long,5488,5556,1.2,1.24,Win,true,Demo index continuation after range reclaim,
demo-2026-007,2026-07-18,Stocks,AMD,Short,166.20,160.80,1.8,3.25,Win,true,Demo supply rejection,
demo-2026-008,2026-07-22,Forex,GBP/USD,Long,1.2765,1.2828,1.4,0.49,Win,true,Demo session liquidity sweep,
demo-2026-009,2026-07-25,Commodities,XAG/USD,Short,30.42,30.86,-0.6,-1.45,Loss,true,Demo silver failed breakdown,
demo-2026-010,2026-07-29,Crypto,BTC/USD,Long,67400,69680,2.25,3.38,Win,true,Demo higher-low continuation,
demo-2026-011,2026-08-02,Stocks,NVDA,Long,137.20,136.10,-0.35,-0.80,Loss,true,Demo tight invalidation hit,
demo-2026-012,2026-08-06,Commodities,XAU/USD,Long,2388.50,2426.40,2.6,1.59,Win,true,Demo expansion after liquidity sweep,`;
function cacheBustedUrl(url) {
	const next = new URL(url);
	next.searchParams.set("_sync", String(Date.now()));
	return next.toString();
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
function splitDelimitedRows(text) {
	const delimiter = text.includes("	") && !text.includes(",") ? "	" : ",";
	const rows = [];
	let row = [];
	let cell = "";
	let quoted = false;
	for (let i = 0; i < text.length; i += 1) {
		const char = text[i];
		const next = text[i + 1];
		if (char === "\"" && quoted && next === "\"") {
			cell += "\"";
			i += 1;
		} else if (char === "\"") quoted = !quoted;
		else if (char === delimiter && !quoted) {
			row.push(cell.trim());
			cell = "";
		} else if ((char === "\n" || char === "\r") && !quoted) {
			if (char === "\r" && next === "\n") i += 1;
			row.push(cell.trim());
			if (row.some(Boolean)) rows.push(row);
			row = [];
			cell = "";
		} else cell += char;
	}
	row.push(cell.trim());
	if (row.some(Boolean)) rows.push(row);
	return rows;
}
function normalizeHeader(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function readNumber(value, fallback = 0) {
	if (!value) return fallback;
	const n = Number(value.replace(/[%,$\s]/g, ""));
	return Number.isFinite(n) ? n : fallback;
}
function readBool(value, fallback = true) {
	if (!value) return fallback;
	return ![
		"false",
		"no",
		"0",
		"draft",
		"unpublished"
	].includes(value.trim().toLowerCase());
}
function readDate(value) {
	if (!value) return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const direct = new Date(value);
	if (!Number.isNaN(direct.getTime())) return direct.toISOString().slice(0, 10);
	return value.slice(0, 10);
}
function pick(row, keys) {
	for (const key of keys) {
		const value = row[key];
		if (value != null && value !== "") return value;
	}
	return "";
}
function toTradePayload(row, index) {
	const date = readDate(pick(row, [
		"date",
		"trade_date",
		"closed_date",
		"exit_date"
	]));
	const instrument = pick(row, [
		"instrument",
		"asset",
		"symbol",
		"pair",
		"ticker"
	]);
	if (!instrument) return null;
	const rMultiple = readNumber(pick(row, [
		"r_multiple",
		"r",
		"r_value",
		"multiple",
		"result_r"
	]));
	const percentage = readNumber(pick(row, [
		"percentage",
		"p_l",
		"pnl",
		"pnl_pct",
		"profit_loss_pct"
	]));
	const externalId = pick(row, [
		"external_id",
		"transaction_id",
		"trade_id",
		"id"
	]) || `${date}-${instrument}-${index + 1}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
	const result = pick(row, ["result", "outcome"]) || (rMultiple > 0 ? "Win" : rMultiple < 0 ? "Loss" : "Breakeven");
	return {
		external_id: externalId,
		date,
		market: pick(row, ["market", "asset_class"]) || "Crypto",
		instrument,
		direction: pick(row, ["direction", "side"]) || "Long",
		entry: pick(row, ["entry", "entry_price"]),
		exit: pick(row, ["exit", "exit_price"]),
		r_multiple: rMultiple,
		percentage,
		result,
		notes: pick(row, [
			"notes",
			"comment",
			"thesis"
		]),
		screenshot: pick(row, [
			"screenshot",
			"image",
			"chart_url"
		]) || null,
		published: readBool(pick(row, [
			"published",
			"live",
			"show"
		]), true)
	};
}
function parseTradeCsv(text) {
	const rows = splitDelimitedRows(text);
	if (rows.length < 2) return [];
	const headers = rows[0].map(normalizeHeader);
	const payloads = [];
	rows.slice(1).forEach((cells, index) => {
		const payload = toTradePayload(Object.fromEntries(headers.map((header, i) => [header, cells[i] ?? ""])), index);
		if (payload) payloads.push(payload);
	});
	return payloads;
}
function payloadToTrade(payload, index) {
	return {
		id: payload.external_id || `sync-${index}`,
		externalId: payload.external_id || "",
		date: payload.date,
		market: payload.market,
		instrument: payload.instrument,
		direction: payload.direction,
		entry: payload.entry,
		exit: payload.exit,
		rMultiple: payload.r_multiple,
		percentage: payload.percentage,
		result: payload.result,
		notes: payload.notes,
		screenshot: payload.screenshot ?? "",
		published: payload.published
	};
}
function loadDemoTrades() {
	return parseTradeCsv(DEMO_TRANSACTION_CSV).map(payloadToTrade).filter((trade) => trade.published).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}
async function loadTradesFromTransactionCsv() {
	const url = process.env.TRANSACTION_CSV_URL || process.env.VITE_TRANSACTION_CSV_URL || "";
	if (!url) return null;
	if (transactionCsvCache && transactionCsvCache.url === url && Date.now() - transactionCsvCache.at < 45e3) return transactionCsvCache.trades;
	const res = await fetch(cacheBustedUrl(url), {
		cache: "no-store",
		headers: {
			Accept: "text/csv,text/plain,*/*",
			"Cache-Control": "no-cache"
		}
	});
	if (!res.ok) throw new Error(`Transaction CSV ${res.status}`);
	const trades = parseTradeCsv(await res.text()).map(payloadToTrade).filter((trade) => trade.published).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
	transactionCsvCache = {
		at: Date.now(),
		url,
		trades
	};
	return trades;
}
/** Single trade by id — admin only. */
var getTrade_createServerFn_handler = createServerRpc({
	id: "3ad37cf53280fdd11c4472a074cbfca68524b4104d757874151788372d474819",
	name: "getTrade",
	filename: "src/lib/trades.functions.ts"
}, (opts) => getTrade.__executeServer(opts));
var getTrade = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(getTrade_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data: row, error } = await (await loadAdminDb(ctx)).from("trading_results").select("*").eq("id", data.id).maybeSingle();
	if (error) throw new Error(error.message);
	if (!row) throw new Error("Trade not found");
	return tradeFromRow(row);
});
var getJournalMetrics_createServerFn_handler = createServerRpc({
	id: "97d76a4822e60b44f62fc5ed587674247ca3d96747d5836f13d81c192f4647bb",
	name: "getJournalMetrics",
	filename: "src/lib/trades.functions.ts"
}, (opts) => getJournalMetrics.__executeServer(opts));
var getJournalMetrics = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getJournalMetrics_createServerFn_handler, async ({ context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data: rows, error } = await (await loadAdminDb(ctx)).from("trading_results").select("*").order("date", { ascending: true });
	if (error) throw new Error(error.message);
	return computeMetrics((rows ?? []).map((r) => tradeFromRow(r)));
});
var getPublishedJournalMetrics_createServerFn_handler = createServerRpc({
	id: "7f0aae08ab276d0dce3fb3b5286b2d9e648477e5bef16aea30411c29197811cf",
	name: "getPublishedJournalMetrics",
	filename: "src/lib/trades.functions.ts"
}, (opts) => getPublishedJournalMetrics.__executeServer(opts));
var getPublishedJournalMetrics = createServerFn({ method: "GET" }).handler(getPublishedJournalMetrics_createServerFn_handler, async () => {
	const syncedTrades = await loadTradesFromTransactionCsv().catch((error) => {
		console.error("[transactions:csv]", error);
		return null;
	});
	if (syncedTrades) return computeMetrics(syncedTrades);
	try {
		const { data, error } = await createPublicSupabase().from("trading_results").select("*").eq("published", true).order("date", { ascending: true });
		if (error) throw new Error(error.message);
		const trades = (data ?? []).map((r) => tradeFromRow(r));
		return computeMetrics(trades.length > 0 ? trades : loadDemoTrades());
	} catch {
		return computeMetrics(loadDemoTrades());
	}
});
var listPublishedTrades_createServerFn_handler = createServerRpc({
	id: "bdd876760703ab3d88b81dd10cf5462a42ba4c02a76a6b855d43ee8980ccc334",
	name: "listPublishedTrades",
	filename: "src/lib/trades.functions.ts"
}, (opts) => listPublishedTrades.__executeServer(opts));
var listPublishedTrades = createServerFn({ method: "GET" }).handler(listPublishedTrades_createServerFn_handler, async () => {
	const syncedTrades = await loadTradesFromTransactionCsv().catch((error) => {
		console.error("[transactions:csv]", error);
		return null;
	});
	if (syncedTrades) return syncedTrades;
	try {
		const { data, error } = await createPublicSupabase().from("trading_results").select("*").eq("published", true).order("date", { ascending: true });
		if (error) throw new Error(error.message);
		const trades = (data ?? []).map((row) => tradeFromRow(row));
		return trades.length > 0 ? trades : loadDemoTrades();
	} catch {
		return loadDemoTrades();
	}
});
var listAllTrades_createServerFn_handler = createServerRpc({
	id: "6a869386e23d10c8a21042ee2f0d8b5c158e158f6dddb07c4da3d8e3e4176219",
	name: "listAllTrades",
	filename: "src/lib/trades.functions.ts"
}, (opts) => listAllTrades.__executeServer(opts));
var listAllTrades = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listAllTrades_createServerFn_handler, async ({ context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data, error } = await (await loadAdminDb(ctx)).from("trading_results").select("*").order("date", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).map((row) => tradeFromRow(row));
});
var saveTrade_createServerFn_handler = createServerRpc({
	id: "b2ef8847aaa421051c61dececb15d9e1f4416aa2bcd208f6db49be447ca3fdd8",
	name: "saveTrade",
	filename: "src/lib/trades.functions.ts"
}, (opts) => saveTrade.__executeServer(opts));
var saveTrade = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => tradeSchema.parse(input)).handler(saveTrade_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const db = await loadAdminDb(ctx);
	const result = data.result || (data.rMultiple > 0 ? "Win" : data.rMultiple < 0 ? "Loss" : "Breakeven");
	const payload = {
		date: data.date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		external_id: data.externalId || null,
		market: data.market,
		instrument: data.instrument,
		direction: data.direction,
		entry: data.entry,
		exit: data.exit,
		r_multiple: data.rMultiple,
		percentage: data.percentage,
		result,
		notes: data.notes,
		screenshot: data.screenshot || null,
		published: data.published
	};
	if (data.id) {
		const { error } = await db.from("trading_results").update(payload).eq("id", data.id);
		if (error) throw new Error(error.message);
	} else {
		const { error } = await db.from("trading_results").insert(payload);
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
var importTradesFromCsv_createServerFn_handler = createServerRpc({
	id: "ef1420853d5952c933143fa37ff46960e41af3cb4199da971cb382289d53863d",
	name: "importTradesFromCsv",
	filename: "src/lib/trades.functions.ts"
}, (opts) => importTradesFromCsv.__executeServer(opts));
var importTradesFromCsv = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => importTradesSchema.parse(input)).handler(importTradesFromCsv_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const db = await loadAdminDb(ctx);
	const payloads = parseTradeCsv(data.text);
	if (payloads.length === 0) throw new Error("No valid trade rows found in the uploaded sheet.");
	if (data.replaceExistingSynced) {
		const { error } = await db.from("trading_results").delete().not("external_id", "is", null);
		if (error) throw new Error(error.message);
	}
	const { error } = await db.from("trading_results").upsert(payloads, { onConflict: "external_id" });
	if (error) throw new Error(error.message);
	return {
		ok: true,
		imported: payloads.length
	};
});
var deleteTrade_createServerFn_handler = createServerRpc({
	id: "49cd47429eb0ced97755f24174fdc7521364367f89db71eb21ff581e859f3074",
	name: "deleteTrade",
	filename: "src/lib/trades.functions.ts"
}, (opts) => deleteTrade.__executeServer(opts));
var deleteTrade = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(deleteTrade_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { error } = await (await loadAdminDb(ctx)).from("trading_results").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteTrade_createServerFn_handler, getJournalMetrics_createServerFn_handler, getPublishedJournalMetrics_createServerFn_handler, getTrade_createServerFn_handler, importTradesFromCsv_createServerFn_handler, listAllTrades_createServerFn_handler, listPublishedTrades_createServerFn_handler, saveTrade_createServerFn_handler };
