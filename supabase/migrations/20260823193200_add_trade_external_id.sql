ALTER TABLE public.trading_results
ADD COLUMN IF NOT EXISTS external_id text;

CREATE UNIQUE INDEX IF NOT EXISTS trading_results_external_id_key
ON public.trading_results (external_id)
WHERE external_id IS NOT NULL;
