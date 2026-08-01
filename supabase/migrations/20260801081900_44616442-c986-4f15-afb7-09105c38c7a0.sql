-- Analyses -------------------------------------------------------------
CREATE TABLE public.analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  pair text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  market text NOT NULL DEFAULT 'Crypto',
  category text NOT NULL DEFAULT '',
  timeframe text NOT NULL DEFAULT '',
  date date NOT NULL DEFAULT CURRENT_DATE,
  series jsonb NOT NULL DEFAULT '[]'::jsonb,
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  bias text NOT NULL DEFAULT '',
  market_structure text NOT NULL DEFAULT '',
  invalidation text NOT NULL DEFAULT '',
  targets jsonb NOT NULL DEFAULT '[]'::jsonb,
  thesis jsonb NOT NULL DEFAULT '[]'::jsonb,
  outcome text NOT NULL DEFAULT '',
  rr text NOT NULL DEFAULT '',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  cover_image text,
  pdf_url text,
  tradingview_url text,
  tags text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.analyses TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analyses TO authenticated;
GRANT ALL ON public.analyses TO service_role;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published analyses are public" ON public.analyses FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins read all analyses" ON public.analyses FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert analyses" ON public.analyses FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update analyses" ON public.analyses FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete analyses" ON public.analyses FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Weekly reports -------------------------------------------------------
CREATE TABLE public.weekly_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  week_label text NOT NULL DEFAULT '',
  date date NOT NULL DEFAULT CURRENT_DATE,
  summary text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  cover_image text,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  pdf_url text,
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.weekly_reports TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.weekly_reports TO authenticated;
GRANT ALL ON public.weekly_reports TO service_role;
ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published reports are public" ON public.weekly_reports FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins read all reports" ON public.weekly_reports FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert reports" ON public.weekly_reports FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update reports" ON public.weekly_reports FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete reports" ON public.weekly_reports FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Trading results ------------------------------------------------------
CREATE TABLE public.trading_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  market text NOT NULL DEFAULT '',
  instrument text NOT NULL DEFAULT '',
  direction text NOT NULL DEFAULT 'Long',
  entry text NOT NULL DEFAULT '',
  exit text NOT NULL DEFAULT '',
  r_multiple numeric NOT NULL DEFAULT 0,
  percentage numeric NOT NULL DEFAULT 0,
  result text NOT NULL DEFAULT 'Win',
  notes text NOT NULL DEFAULT '',
  screenshot text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.trading_results TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trading_results TO authenticated;
GRANT ALL ON public.trading_results TO service_role;
ALTER TABLE public.trading_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published results are public" ON public.trading_results FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins read all results" ON public.trading_results FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert results" ON public.trading_results FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update results" ON public.trading_results FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete results" ON public.trading_results FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Inquiries ------------------------------------------------------------
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  organization text NOT NULL DEFAULT '',
  message text NOT NULL,
  handled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at triggers --------------------------------------------------
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER analyses_touch BEFORE UPDATE ON public.analyses FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER weekly_reports_touch BEFORE UPDATE ON public.weekly_reports FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trading_results_touch BEFORE UPDATE ON public.trading_results FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.analyses (slug, title, pair, market, category, timeframe, date, series, summary, description, bias, market_structure, invalidation, targets, thesis, outcome, rr, gallery, cover_image, pdf_url, tags, featured, published, sort_order) VALUES
('btcusd-quarterly-reaccumulation', 'Quarterly re-accumulation into prior range high', 'BTC / USD', 'Crypto', 'Case study', 'Weekly · Daily refinement', '2026-05-18', '[22,25,21,28,26,33,30,38,44,41,52,58,55,66,74]'::jsonb, 'Range-bound structure resolved after a liquidity sweep of the prior quarterly low, with weekly demand defended on three consecutive closes.', 'Range-bound structure resolved after a liquidity sweep of the prior quarterly low, with weekly demand defended on three consecutive closes.', 'Bullish', '', 'Weekly close below the swept quarterly low invalidates the re-accumulation read.', '[{"label":"Entry zone","value":"Weekly demand block"},{"label":"Invalidation","value":"Below quarterly low"},{"label":"Target 1","value":"Internal range high"},{"label":"Target 2","value":"Prior quarterly high"}]'::jsonb, '["Weekly structure held a higher low while momentum diverged, signalling absorption rather than distribution.","The sweep of the quarterly low cleared resting sell-side liquidity, providing the fuel for an expansion leg.","Daily order flow confirmed with a displacement candle closing above the previous internal structure high."]'::jsonb, 'Target 1 & 2 reached · +3.8R', '3.8R', '[]'::jsonb, null, null, ARRAY['Crypto','BTC/USD']::text[], true, true, 0),
('eurusd-liquidity-reversal', 'Session liquidity reversal at weekly supply', 'EUR / USD', 'Forex', 'Case study', '4H · 15M execution', '2026-04-02', '[70,74,72,78,82,79,86,80,68,62,55,58,48,42,36]'::jsonb, 'London high sweep into an unmitigated weekly supply zone produced a clean shift in intraday market structure.', 'London high sweep into an unmitigated weekly supply zone produced a clean shift in intraday market structure.', 'Bearish', '', '15M close back above the swept session high.', '[{"label":"Entry zone","value":"Weekly supply"},{"label":"Invalidation","value":"Above London high"},{"label":"Target 1","value":"Session equilibrium"},{"label":"Target 2","value":"Weekly discount"}]'::jsonb, '["Unmitigated weekly supply aligned with a premium pricing array on the 4H range.","London sweep engineered buy-side liquidity above the Asian session high.","15M change of character confirmed the short-term flow reversal before entry."]'::jsonb, 'Full target · +2.6R', '2.6R', '[]'::jsonb, null, null, ARRAY['Forex','EUR/USD']::text[], true, true, 1),
('xauusd-trend-continuation', 'Trend continuation from discount demand', 'XAU / USD', 'Commodities', 'Case study', 'Daily · 1H', '2026-03-11', '[30,34,40,38,46,52,48,56,62,58,68,76,82,88,96]'::jsonb, 'Pullback into daily discount demand with declining sell volume, offering an asymmetric continuation entry into an established uptrend.', 'Pullback into daily discount demand with declining sell volume, offering an asymmetric continuation entry into an established uptrend.', 'Bullish', '', 'Daily close below the origin of the impulse leg.', '[{"label":"Entry zone","value":"Daily discount demand"},{"label":"Invalidation","value":"Below impulse origin"},{"label":"Target 1","value":"Prior high"},{"label":"Target 2","value":"Measured extension"}]'::jsonb, '["Higher timeframe trend intact with successive higher highs and higher lows.","Pullback delivered price into the 0.62–0.79 discount band of the impulse leg.","1H demand reclaimed with rising delta into the London open."]'::jsonb, 'Runner trailed · +5.1R', '5.1R', '[]'::jsonb, null, null, ARRAY['Commodities','XAU/USD']::text[], true, true, 2),
('nas100-distribution-top', 'Distribution schematic ahead of macro catalyst', 'NAS100', 'Indices', 'Case study', 'Daily · 4H', '2026-02-06', '[88,92,90,96,94,98,91,84,88,76,70,72,63,58,54]'::jsonb, 'Failed breakout above range highs formed a textbook upthrust, with breadth deteriorating ahead of the rate decision.', 'Failed breakout above range highs formed a textbook upthrust, with breadth deteriorating ahead of the rate decision.', 'Bearish', '', 'Daily acceptance above the range high.', '[{"label":"Entry zone","value":"4H supply retest"},{"label":"Invalidation","value":"Above range high"},{"label":"Target 1","value":"Range equilibrium"},{"label":"Target 2","value":"Range low"}]'::jsonb, '["Range highs swept with immediate rejection and no acceptance above.","Breadth divergence: fewer constituents confirming the index high.","4H supply held on the retest, confirming the distribution read."]'::jsonb, 'Partial target · +1.9R', '1.9R', '[]'::jsonb, null, null, ARRAY['Indices','NAS100']::text[], false, true, 3),
('aapl-earnings-structure', 'Post-earnings structure reset and reclaim', 'AAPL', 'Stocks', 'Case study', 'Daily', '2026-01-24', '[44,48,46,52,40,38,42,46,50,47,55,60,58,66,70]'::jsonb, 'Earnings gap filled into prior consolidation before buyers reclaimed the level, resetting the daily trend structure.', 'Earnings gap filled into prior consolidation before buyers reclaimed the level, resetting the daily trend structure.', 'Bullish', '', 'Daily close back inside the gap zone.', '[{"label":"Entry zone","value":"Value area high reclaim"},{"label":"Invalidation","value":"Inside gap"},{"label":"Target 1","value":"Pre-earnings high"},{"label":"Target 2","value":"All-time high retest"}]'::jsonb, '["Gap fill delivered price into a high-volume node from the previous quarter.","Reclaim candle closed above the value area high with expanding volume.","Relative strength versus the index confirmed institutional participation."]'::jsonb, 'Target reached · +2.2R', '2.2R', '[]'::jsonb, null, null, ARRAY['Stocks','AAPL']::text[], false, true, 4),
('ethusd-range-rotation', 'Range rotation from equilibrium to premium', 'ETH / USD', 'Crypto', 'Case study', 'Daily · 4H', '2025-12-09', '[40,38,44,42,48,45,52,50,57,54,62,60,68,66,73]'::jsonb, 'Mean-reversion rotation inside a maturing daily range, executed with tight risk against range equilibrium.', 'Mean-reversion rotation inside a maturing daily range, executed with tight risk against range equilibrium.', 'Bullish', '', '4H close below range equilibrium.', '[{"label":"Entry zone","value":"Range equilibrium"},{"label":"Invalidation","value":"Below equilibrium"},{"label":"Target 1","value":"Premium band"},{"label":"Target 2","value":"Range high"}]'::jsonb, '["Daily range mature enough to trade rotations rather than breakouts.","Equilibrium defended with a clean 4H demand reaction.","Funding and open interest reset supported continuation."]'::jsonb, 'Scaled out · +2.9R', '2.9R', '[]'::jsonb, null, null, ARRAY['Crypto','ETH/USD']::text[], false, true, 5);