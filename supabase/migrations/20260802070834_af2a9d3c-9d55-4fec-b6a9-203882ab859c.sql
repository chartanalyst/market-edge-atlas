ALTER TABLE public.weekly_reports
  ADD COLUMN IF NOT EXISTS asset text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS market text NOT NULL DEFAULT 'Crypto',
  ADD COLUMN IF NOT EXISTS tradingview_url text;

DROP TRIGGER IF EXISTS touch_weekly_reports ON public.weekly_reports;
CREATE TRIGGER touch_weekly_reports BEFORE UPDATE ON public.weekly_reports
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();