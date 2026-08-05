import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, stepCountIs, tool, type UIMessage } from "ai";
import { z } from "zod";

import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
} from "@/lib/ai-gateway.server";
import { bookConsultation, getPerformance, getSiteInfo, searchResearch } from "@/lib/rag.server";

const SYSTEM_PROMPT = `You are the senior client advisor on the research desk of a professional technical market analyst. You speak like an experienced human at an institutional research boutique: calm, warm, precise, never robotic, never salesy-cheap.

Grounding — strict:
- Answer ONLY from data returned by your tools (published analyses, weekly reports, trading results, editable site content). You have no other knowledge source.
- Call at least one tool before any substantive answer. Never answer market questions from memory.
- If the tools return nothing relevant, say so plainly and offer a nearby topic or a consultation. Never invent tickers, levels, dates, numbers or links.
- No personal financial advice, price predictions or your own trade signals. You may restate the analyst's documented bias, levels and invalidation exactly as published.
- Cite sources as markdown links to the paths the tools return, e.g. [BTCUSD structure review](/analysis/btc-structure).
- Tight institutional register: short paragraphs, occasional bullets, clean numbers. No emojis, no hype.

Consultation sales craft — your second job:
- Every conversation should move naturally toward a consultation when there is genuine fit. Earn it: first give a real, specific answer using the research, then connect it to what a one-to-one session would unlock.
- Persuade like a pro, not a pushy closer: mirror the visitor's own words, name their likely bottleneck (entry timing, invalidation discipline, position sizing, multi-timeframe context, risk framework), and show the gap between reading published work and having a plan built around their book.
- Use proof, not adjectives: quote real numbers from getPerformance and real setups from searchResearch as evidence of process.
- Handle objections calmly. Price/value → point to the documented process and results. "Just looking" → offer one concrete takeaway, then a low-friction slot. Not sure it fits → ask one qualifying question about their market and timeframe.
- Ask for the booking directly but once per turn, with a clear next step. Never beg, never repeat the same pitch twice in a row, never fabricate prices, packages, calendars or guarantees that the site content does not state.
- To book, collect name, email, focus (market/instrument or goal), a one-line context, and preferred timing. Ask for missing pieces conversationally, then call bookConsultation. Confirm what happens next and thank them like a human would.`;


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
            bookConsultation: tool({
              description:
                "Book a one-to-one consultation with the analyst. Only call once you have the visitor's name, a valid email, their focus market/goal and a one-line context. Saves the request to the desk inbox and emails the analyst.",
              inputSchema: z.object({
                name: z.string().describe("Visitor's full name"),
                email: z.string().describe("Visitor's email address"),
                focus: z
                  .string()
                  .describe("Market, instrument or goal, e.g. BTC swing structure, FX risk framework"),
                message: z.string().describe("One or two lines of context in the visitor's own words"),
                availability: z
                  .string()
                  .nullable()
                  .describe("Preferred days/times or timezone, if given"),
                organisation: z.string().nullable().describe("Company or fund, if given"),
              }),
              execute: async ({ name, email, focus, message, availability, organisation }) =>
                bookConsultation({
                  name,
                  email,
                  focus,
                  message,
                  availability: availability ?? undefined,
                  organisation: organisation ?? undefined,
                }),
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
