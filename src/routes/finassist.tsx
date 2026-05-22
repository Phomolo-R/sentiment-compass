import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { chatWithFinAssist, type ChatMsg } from "@/lib/finassist.functions";

export const Route = createFileRoute("/finassist")({
  component: FinAssistPage,
  head: () => ({
    meta: [
      { title: "FinAssist — AI Loan & Credit Guidance" },
      {
        name: "description",
        content:
          "Chat with FinAssist, an AI-powered loan and credit guidance assistant for South African banking questions.",
      },
    ],
  }),
});

const QUICK_TOPICS = [
  { icon: "💼", label: "Loan Types", q: "What types of loans are available?" },
  { icon: "📊", label: "Credit Score Impact", q: "How does credit score affect my loan application?" },
  { icon: "📄", label: "Required Documents", q: "What documents do I need to apply for a loan?" },
  { icon: "📈", label: "Improve Credit", q: "How can I improve my credit score?" },
];

interface UiMsg extends ChatMsg {}

function formatText(text: string) {
  // Escape HTML
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "• $1")
    .replace(/\n/g, "<br/>");
}

function FinAssistPage() {
  const chat = useServerFn(chatWithFinAssist);
  const [messages, setMessages] = useState<UiMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: UiMsg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    try {
      const { reply } = await chat({ data: { messages: next } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Connection error. Please try again.";
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-4 text-white"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(20,20,20,0.8) 0%, transparent 60%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between rounded-[14px] border border-[rgba(201,168,76,0.25)] bg-[linear-gradient(135deg,#122848_0%,#1A3560_100%)] px-6 py-[18px] shadow-[0_8px_32px_rgba(11,31,58,0.18)]">
          <div className="flex items-center gap-[14px]">
            <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#C9A84C_0%,#E8C97A_100%)] text-[22px] shadow-[0_4px_12px_rgba(201,168,76,0.35)]">
              🏦
            </div>
            <div>
              <h1 className="font-[DM_Serif_Display,serif] text-[22px] leading-none tracking-tight text-white">
                FinAssist
              </h1>
              <p className="mt-[3px] text-xs font-light text-[#E8C97A]">
                AI-Powered Loan & Credit Guidance
              </p>
            </div>
          </div>
          <div className="hidden flex-wrap gap-2 sm:flex">
            {["🤖 Lovable AI", "🔒 Finance", "📋 Week 4"].map((b) => (
              <span
                key={b}
                className="whitespace-nowrap rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.12)] px-[10px] py-1 text-[11px] font-medium text-[#E8C97A]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Quick topics */}
        <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-4">
          {QUICK_TOPICS.map((t) => (
            <button
              key={t.label}
              onClick={() => send(t.q)}
              disabled={loading}
              className="rounded-[10px] border border-[rgba(201,168,76,0.18)] bg-white/[0.04] px-[10px] py-3 text-left transition hover:-translate-y-px hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.1)] disabled:opacity-50"
            >
              <span className="mb-[5px] block text-[18px]">{t.icon}</span>
              <span className="block text-xs font-medium leading-[1.3] text-[#F5E4B0]">
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div
          ref={scrollRef}
          className="flex h-[420px] flex-col gap-[14px] overflow-y-auto rounded-[14px] border border-[rgba(201,168,76,0.15)] bg-white/[0.03] p-5"
        >
          {/* Welcome */}
          <Bubble role="assistant" html={formatText(
            "Welcome to **FinAssist** — your AI-powered loan and credit guidance assistant. 👋\n\nI can help you understand **loan types**, **credit scores**, **application requirements**, **interest rates**, and much more — all in plain, easy-to-understand language.\n\nWhat would you like to know today?"
          )} disclaimer />

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role} html={formatText(m.content)} />
          ))}

          {loading && (
            <div className="flex max-w-full animate-[fadeUp_0.3s_ease] gap-[10px]">
              <Avatar bot />
              <div className="flex w-fit items-center gap-[5px] rounded-[14px] rounded-tl-[4px] border border-[rgba(201,168,76,0.12)] bg-white/[0.05] px-[14px] py-[10px]">
                <Dot delay={0} />
                <Dot delay={0.2} />
                <Dot delay={0.4} />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-end gap-[10px] rounded-[14px] border border-[rgba(201,168,76,0.2)] bg-white/[0.04] px-4 py-[14px]">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = Math.min(el.scrollHeight, 120) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about loans, credit scores, interest rates..."
            className="max-h-[120px] min-h-[22px] flex-1 resize-none border-0 bg-transparent text-sm leading-[1.55] text-white outline-none placeholder:text-white/25"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            title="Send"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-0 bg-[linear-gradient(135deg,#C9A84C_0%,#E8C97A_100%)] text-[17px] text-[#0B1F3A] shadow-[0_4px_12px_rgba(201,168,76,0.3)] transition hover:scale-[1.07] hover:shadow-[0_6px_16px_rgba(201,168,76,0.4)] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ➤
          </button>
        </div>

        <div className="pb-1 text-center text-[11px] text-white/20">
          CAPACITI AI Bootcamp 2026 — Week 4 Project &nbsp;|&nbsp; FinAssist &nbsp;|&nbsp; Not a licensed financial advisor
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes faBounce { 0%,60%,100% { transform: translateY(0); opacity:0.5 } 30% { transform: translateY(-5px); opacity:1 } }
      `}</style>
    </div>
  );
}

function Avatar({ bot, user }: { bot?: boolean; user?: boolean }) {
  if (bot) {
    return (
      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#C9A84C_0%,#E8C97A_100%)] text-[15px] font-semibold text-[#0B1F3A]">
        FA
      </div>
    );
  }
  return (
    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[#1A3560] text-[13px] font-semibold text-[#E8C97A]">
      You
    </div>
  );
}

function Bubble({
  role,
  html,
  disclaimer,
}: {
  role: "user" | "assistant";
  html: string;
  disclaimer?: boolean;
}) {
  const isBot = role === "assistant";
  return (
    <div
      className={`flex max-w-full animate-[fadeUp_0.3s_ease] gap-[10px] ${
        isBot ? "" : "flex-row-reverse"
      }`}
    >
      {isBot ? <Avatar bot /> : <Avatar user />}
      <div className="max-w-[78%]">
        <div
          className={
            isBot
              ? "rounded-[14px] rounded-tl-[4px] border border-[rgba(201,168,76,0.15)] bg-white/[0.06] px-4 py-3 text-sm leading-[1.65] text-[#E8EDF3] [&_strong]:font-semibold [&_strong]:text-[#E8C97A]"
              : "rounded-[14px] rounded-tr-[4px] bg-[linear-gradient(135deg,#C9A84C_0%,#E8C97A_100%)] px-4 py-3 text-sm font-medium leading-[1.65] text-[#0B1F3A] [&_strong]:font-semibold [&_strong]:text-[#0B1F3A]"
          }
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {disclaimer && (
          <div className="mt-[2px] flex items-start gap-[6px] rounded-lg border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.07)] px-3 py-2 text-[11px] text-[#F5E4B0]">
            ⚠️ FinAssist provides general financial guidance only. For personalised advice, please consult a qualified financial advisor or your bank.
          </div>
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <div
      className="h-[7px] w-[7px] rounded-full bg-[#C9A84C]"
      style={{ animation: `faBounce 1.2s infinite`, animationDelay: `${delay}s` }}
    />
  );
}
