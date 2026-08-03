import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, stepCountIs, tool, type UIMessage } from "ai";
import { z } from "zod";

import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
} from "@/lib/ai-gateway.server";
import { getPerformance, getSiteInfo, searchResearch } from "@/lib/rag.server";

const SYSTEM_PROMPT = `You are the research desk assistant for a professional technical market analyst's portfolio site.

Ground rules — follow strictly:
- Answer ONLY from data returned by your tools (published analyses, weekly reports, trading results and editable site content). You have no other knowledge source.
- Always call at least one tool before answering a substantive question. Never answer market questions from memory.
- If the tools return nothing relevant, say plainly that the site does not cover it and suggest a nearby topic or the contact form. Never invent tickers, levels, dates, numbers or links.
- Never give personal financial advice, price predictions or trade signals of your own. You may describe the analyst's documented bias, levels and invalidation exactly as published.
- Cite what you used as markdown links to the site paths returned by the tools, e.g. [BTCUSD structure review](/analysis/btc-structure).
- Keep answers tight and institutional: short paragraphs, occasional bullets, monospace-friendly numbers. No emojis, no hype.
- You can also explain how the site works: sections, services, process, certifications, weekly reports, performance dashboard, contact form, CV download and social links.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(body.messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response("AI is not configured", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(apiKey, getLovableAiGatewayRunId(request));

        const result = streamText({
          model: gateway("google/gemini-3.6-flash"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(body.messages.slice(-20) as UIMessage[]),
          stopWhen: stepCountIs(50),
          tools: {
            searchResearch: tool({
              description:
                "Search the published analyses and weekly reports by keyword, ticker or theme. Use for any question about markets, setups, levels, bias or research.",
              inputSchema: z.object({
                query: z.string().describe("Keyword, ticker or theme, e.g. BTC, gold, liquidity"),
                market: z
                  .string()
                  .nullable()
                  .describe("Optional market filter: Crypto, Forex, Stocks, Commodities, Indices"),
              }),
              execute: async ({ query, market }) =>
                searchResearch(query, market ?? undefined),
            }),
            getPerformance: tool({
              description:
                "Trading results and derived KPIs (win rate, total R, average R, recent trades) from the logged journal.",
              inputSchema: z.object({}),
              execute: async () => getPerformance(),
            }),
            getSiteInfo: tool({
              description:
                "Site content managed in the dashboard: copy, services, markets covered, process, certifications, testimonials, FAQ, KPIs, ticker, coverage map and social links.",
              inputSchema: z.object({
                topics: z
                  .array(z.string())
                  .nullable()
                  .describe(
                    "Optional keys to narrow: copy, services, markets, processSteps, certifications, testimonials, faqs, differentiators, stats, tickerItems, coverageMap, links, sections",
                  ),
              }),
              execute: async ({ topics }) => getSiteInfo(topics ?? undefined),
            }),
          },
        });

        return result.toUIMessageStreamResponse({
          originalMessages: body.messages as UIMessage[],
          onError: (error) => {
            console.error("chat stream error", error);
            return error instanceof Error ? error.message : "Chat failed";
          },
        });
      },
    },
  },
});
