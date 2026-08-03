import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquareText, Plus, X, Database } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "research-desk-chat-v1";

const SUGGESTIONS = [
  "What is the current BTC bias?",
  "Show the latest weekly report",
  "What are the trading stats?",
  "Which services are offered?",
];

type StoredChat = { id: string; messages: UIMessage[] };

function newId() {
  return `chat-${Date.now().toString(36)}`;
}

/** Reads the persisted conversation once, on the client, before first render. */
function loadChat(): StoredChat {
  if (typeof window === "undefined") return { id: "chat-ssr", messages: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredChat;
      if (parsed?.id && Array.isArray(parsed.messages)) return parsed;
    }
  } catch {
    /* corrupted history is simply discarded */
  }
  const fresh = { id: newId(), messages: [] as UIMessage[] };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  } catch {
    /* storage unavailable — chat still works for this session */
  }
  return fresh;
}

function textOf(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
    .trim();
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initial, setInitial] = useState<StoredChat>({ id: "chat-ssr", messages: [] });

  useEffect(() => {
    setInitial(loadChat());
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close research assistant" : "Open research assistant"}
        className="fixed bottom-6 right-6 z-50 flex h-12 items-center gap-2 border border-foreground bg-foreground px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-background transition-transform hover:-translate-y-0.5"
      >
        {open ? <X className="size-4" /> : <MessageSquareText className="size-4" />}
        {open ? "Close" : "Ask the desk"}
      </button>

      <AnimatePresence>
        {open && mounted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(620px,calc(100dvh-8rem))] w-[min(420px,calc(100vw-2rem))] flex-col border border-foreground bg-background shadow-[8px_8px_0_0_hsl(var(--foreground)/0.12)]"
          >
            <ChatPanel key={initial.id} initial={initial} onReset={setInitial} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ChatPanel({
  initial,
  onReset,
}: {
  initial: StoredChat;
  onReset: (chat: StoredChat) => void;
}) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { messages, sendMessage, status, error } = useChat({
    id: initial.id,
    messages: initial.messages,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  // Persist the conversation for this browser.
  useEffect(() => {
    if (status === "streaming") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ id: initial.id, messages } satisfies StoredChat),
      );
    } catch {
      /* ignore quota errors */
    }
  }, [messages, status, initial.id]);

  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy]);

  const submit = useCallback(
    (text: string) => {
      const value = text.trim();
      if (!value || busy) return;
      setInput("");
      void sendMessage({ text: value });
    },
    [busy, sendMessage],
  );

  const startNew = () => {
    const fresh: StoredChat = { id: newId(), messages: [] };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      /* ignore */
    }
    onReset(fresh);
  };

  return (
    <>
      <header className="flex items-center justify-between gap-3 border-b border-foreground/15 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center border border-foreground/20 bg-accent/40 text-accent-foreground">
            <Database className="size-3.5" />
          </span>
          <div className="leading-tight">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Research desk
            </p>
            <p className="text-sm font-semibold tracking-tight">Grounded in this site's data</p>
          </div>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="flex items-center gap-1 border border-foreground/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <Plus className="size-3" /> New
        </button>
      </header>

      <Conversation className="flex-1">
        <ConversationContent className="gap-5 px-4 py-4">
          {messages.length === 0 ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Ask about published analyses, weekly reports, logged trading results or how this
                desk works. Answers come only from the site database.
              </p>
              <div className="grid gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="border border-foreground/15 px-3 py-2 text-left text-xs transition-colors hover:border-foreground hover:bg-accent/30"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {messages.map((message) => {
            const text = textOf(message);
            const tools = message.parts.filter((p) => p.type.startsWith("tool-"));
            return (
              <Message key={message.id} from={message.role}>
                <MessageContent
                  className={cn(
                    "group-[.is-user]:rounded-none group-[.is-user]:border group-[.is-user]:border-foreground group-[.is-user]:bg-foreground group-[.is-user]:text-background",
                  )}
                >
                  {message.role === "assistant" && tools.length > 0 && !text ? (
                    <Shimmer className="font-mono text-[11px] uppercase tracking-[0.16em]">
                      Querying database…
                    </Shimmer>
                  ) : null}
                  {text ? (
                    message.role === "assistant" ? (
                      <MessageResponse className="prose-sm">{text}</MessageResponse>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm">{text}</p>
                    )
                  ) : null}
                </MessageContent>
              </Message>
            );
          })}

          {status === "submitted" ? (
            <Shimmer className="font-mono text-[11px] uppercase tracking-[0.16em]">
              Thinking…
            </Shimmer>
          ) : null}

          {error ? (
            <p className="border border-destructive/40 px-3 py-2 text-xs text-destructive">
              {error.message || "The assistant is unavailable right now."}
            </p>
          ) : null}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-foreground/15 p-3">
        <PromptInput
          onSubmit={(_, event) => {
            event.preventDefault();
            submit(input);
          }}
        >
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a ticker, report or the desk…"
            autoFocus
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </>
  );
}
