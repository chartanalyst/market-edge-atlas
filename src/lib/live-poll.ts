/** How often live market surfaces refetch (matches server cache TTL). */
export const LIVE_POLL_MS = 45_000;

export const liveQueryOptions = {
  refetchInterval: LIVE_POLL_MS,
  refetchIntervalInBackground: true,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  staleTime: LIVE_POLL_MS / 2,
} as const;
