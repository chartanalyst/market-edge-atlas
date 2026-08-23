//#region node_modules/.nitro/vite/services/ssr/assets/live-poll-BjhnCmuD.js
/** How often live market surfaces refetch (matches server cache TTL). */
var LIVE_POLL_MS = 45e3;
var liveQueryOptions = {
	refetchInterval: LIVE_POLL_MS,
	refetchIntervalInBackground: true,
	refetchOnWindowFocus: true,
	refetchOnReconnect: true,
	staleTime: LIVE_POLL_MS / 2
};
//#endregion
export { liveQueryOptions as n, LIVE_POLL_MS as t };
