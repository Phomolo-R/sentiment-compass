import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteNav } from "@/components/SiteNav";
import {
  analyzeSentiment,
  presets,
  sentimentBadgeClass,
  sentimentColor,
  type AnalysisResult,
  type Sentiment,
} from "@/lib/sentiment";

export const Route = createFileRoute("/")({
  component: AnalyzerPage,
  head: () => ({
    meta: [
      { title: "Restaurant Sentiment Analyzer" },
      { name: "description", content: "Paste a restaurant review and instantly classify its sentiment, confidence, and key signals." },
    ],
  }),
});

interface HistoryItem {
  text: string;
  result: AnalysisResult;
}

function AnalyzerPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const counts = useMemo(() => ({
    Positive: history.filter((h) => h.result.sentiment === "Positive").length,
    Neutral: history.filter((h) => h.result.sentiment === "Neutral").length,
    Negative: history.filter((h) => h.result.sentiment === "Negative").length,
  }), [history]);

  function handleAnalyze() {
    const v = text.trim();
    if (!v) return;
    const r = analyzeSentiment(v);
    setResult(r);
    setHistory((h) => [{ text: v.length > 120 ? v.slice(0, 120) + "…" : v, result: r }, ...h]);
  }

  function handleClear() {
    setText("");
    setResult(null);
  }

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-2xl font-bold text-primary">Restaurant Sentiment Analyzer</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          CAPACITI AI Bootcamp 2026 — Week 3 Project. Paste any restaurant review to analyze its sentiment.
        </p>

        <section className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
          <label className="text-xs font-semibold text-foreground/80">Try a sample review</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["positive", "neutral", "negative", "mixed"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setText(presets[k])}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {k.charAt(0).toUpperCase() + k.slice(1)} example
              </button>
            ))}
          </div>

          <label className="mt-5 block text-xs font-semibold text-foreground/80">Paste or type a restaurant review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") handleAnalyze();
            }}
            placeholder="e.g. The food was amazing and the service was top-notch. Highly recommend!"
            className="mt-2 min-h-[130px] w-full resize-vertical rounded-lg border border-input bg-background px-3 py-3 text-sm outline-none ring-ring focus:border-ring focus:ring-2"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={handleAnalyze}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Analyze Sentiment
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg bg-secondary px-5 py-2 text-sm font-semibold text-secondary-foreground transition hover:opacity-90"
            >
              Clear
            </button>
          </div>
        </section>

        {result && <ResultCard result={result} />}

        <section className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="text-sm font-semibold">Session history</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Stat n={counts.Positive} label="Positive" sentiment="Positive" />
            <Stat n={counts.Neutral} label="Neutral" sentiment="Neutral" />
            <Stat n={counts.Negative} label="Negative" sentiment="Negative" />
          </div>
          <div className="mt-4 space-y-2">
            {history.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
                No reviews analyzed yet. Paste a review above to get started.
              </div>
            ) : (
              history.map((h, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-border px-3 py-2.5">
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${sentimentBadgeClass(h.result.sentiment)}`}>
                    {h.result.sentiment}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm text-foreground/80">{h.text}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">Confidence: {h.result.confidence}%</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ n, label, sentiment }: { n: number; label: string; sentiment: Sentiment }) {
  return (
    <div className="rounded-lg bg-secondary px-3 py-3 text-center">
      <div className="text-xl font-bold" style={{ color: sentimentColor(sentiment) }}>{n}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function ResultCard({ result }: { result: AnalysisResult }) {
  const color = sentimentColor(result.sentiment);
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-5">
        <div>
          <div className="text-xs text-muted-foreground">Sentiment Classification</div>
          <span className={`mt-1 inline-block rounded-full px-5 py-1.5 text-base font-bold ${sentimentBadgeClass(result.sentiment)}`}>
            {result.sentiment}
          </span>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Confidence Score</div>
          <div className="text-3xl font-bold" style={{ color }}>{result.confidence}%</div>
        </div>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${result.confidence}%`, background: color }} />
      </div>
      <div className="mt-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Key signals detected</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {result.signals.map((s, i) => (
          <span key={i} className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80">{s}</span>
        ))}
      </div>
      <div
        className="mt-4 rounded-lg border-l-4 bg-secondary/60 p-3 text-sm text-foreground/80"
        style={{ borderLeftColor: color }}
      >
        {result.explanation}
      </div>
    </section>
  );
}
