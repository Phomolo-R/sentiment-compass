import { createFileRoute } from "@tanstack/react-router";
import {
  Cell,
  Pie,
  PieChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SiteNav } from "@/components/SiteNav";
import { reviews } from "@/lib/reviews-data";
import { sentimentBadgeClass, sentimentColor, type Sentiment } from "@/lib/sentiment";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [
      { title: "Sentiment Analysis Dashboard" },
      { name: "description", content: "Aggregate sentiment insights across 25 restaurant reviews — distribution, confidence, and key strengths." },
    ],
  }),
});

function avg(arr: number[]) {
  return arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
}

function starStr(n: number) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function DashboardPage() {
  const pos = reviews.filter((r) => r.sentiment === "Positive");
  const neu = reviews.filter((r) => r.sentiment === "Neutral");
  const neg = reviews.filter((r) => r.sentiment === "Negative");
  const total = reviews.length;
  const avgConf = avg(reviews.map((r) => r.score));

  const pieData = [
    { name: "Positive", value: pos.length, color: "var(--positive)" },
    { name: "Neutral", value: neu.length, color: "var(--neutral)" },
    { name: "Negative", value: neg.length, color: "var(--negative)" },
  ];

  const barData = [
    { name: "Positive", value: avg(pos.map((r) => r.score)), color: "var(--positive)" },
    { name: "Neutral", value: avg(neu.map((r) => r.score)), color: "var(--neutral)" },
    { name: "Negative", value: avg(neg.map((r) => r.score)), color: "var(--negative)" },
  ];

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-2xl font-bold text-primary">Restaurant Review Sentiment Analysis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          CAPACITI AI Bootcamp 2026 — Week 3 Project | {total} Reviews Analyzed | May 2026
        </p>

        <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard n={pos.length} label={`Positive (${Math.round((pos.length / total) * 100)}%)`} color="var(--positive)" />
          <MetricCard n={neu.length} label={`Neutral (${Math.round((neu.length / total) * 100)}%)`} color="var(--neutral)" />
          <MetricCard n={neg.length} label={`Negative (${Math.round((neg.length / total) * 100)}%)`} color="var(--negative)" />
          <MetricCard n={avgConf} label="Avg Confidence Score" color="oklch(0.5 0.13 250)" />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ChartCard title="Sentiment breakdown">
            <Legend items={pieData.map((d) => ({ label: `${d.name} ${Math.round((d.value / total) * 100)}%`, color: d.color }))} />
            <div className="h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={0} outerRadius={85} stroke="#fff" strokeWidth={2}>
                    {pieData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Average confidence score by sentiment">
            <Legend items={barData.map((d) => ({ label: d.name, color: d.color }))} />
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip formatter={(v: number) => `${v}%`} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {barData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Confidence score per review (Reviews 1–25)" className="lg:col-span-2">
            <Legend
              items={[
                { label: "Positive (1–12)", color: "var(--positive)" },
                { label: "Neutral (13–17)", color: "var(--neutral)" },
                { label: "Negative (18–25)", color: "var(--negative)" },
              ]}
            />
            <div className="h-52">
              <ResponsiveContainer>
                <BarChart data={reviews.map((r) => ({ id: r.id, score: r.score, color: sentimentColor(r.sentiment) }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="id" tickLine={false} axisLine={false} fontSize={10} />
                  <YAxis domain={[60, 100]} tickLine={false} axisLine={false} fontSize={11} />
                  <Tooltip formatter={(v: number) => `${v}%`} labelFormatter={(l) => `Review #${l}`} />
                  <Bar dataKey="score" radius={[3, 3, 0, 0]}>
                    {reviews.map((r, i) => (
                      <Cell key={i} fill={sentimentColor(r.sentiment)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <InsightCard title="Strengths" tone="var(--positive)" body="Food quality and staff friendliness drive the most positive reviews. Words like “outstanding”, “consistently top-notch” and “unforgettable” appear across 12 reviews with high confidence." />
          <InsightCard title="Critical Concerns" tone="var(--negative)" body="Food safety issues (plastic in food, food poisoning), long waits, and poor management responses — all scoring 97–99% negative confidence — require urgent attention." />
          <InsightCard title="Opportunities" tone="var(--accent-gold)" body="Neutral reviews highlight seasoning, portion sizes, and menu variety as areas for improvement. Small upgrades could shift neutral customers into loyal, positive ones." />
        </section>

        <section className="mt-6 overflow-x-auto rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 text-sm font-semibold">Full Results Table</div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="px-3 py-2.5 text-left font-semibold">#</th>
                <th className="px-3 py-2.5 text-left font-semibold">Sentiment</th>
                <th className="px-3 py-2.5 text-left font-semibold">Confidence Score</th>
                <th className="px-3 py-2.5 text-left font-semibold">Key Signals</th>
                <th className="px-3 py-2.5 text-left font-semibold">Stars</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-3 py-2 text-xs text-muted-foreground">{r.id}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${sentimentBadgeClass(r.sentiment)}`}>
                      {r.sentiment}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 min-w-[80px] flex-1 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: sentimentColor(r.sentiment) }} />
                      </div>
                      <span className="min-w-[34px] text-xs font-semibold" style={{ color: sentimentColor(r.sentiment) }}>
                        {r.score}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-foreground/80">{r.keys}</td>
                  <td className="px-3 py-2 text-sm" style={{ color: "var(--accent-gold)" }}>{starStr(r.stars)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="mt-6 border-t border-border py-4 text-center text-xs text-muted-foreground">
          Restaurant Sentiment Analysis Dashboard | CAPACITI AI Bootcamp 2026 | Week 3 Project
        </footer>
      </main>
    </div>
  );
}

function MetricCard({ n, label, color }: { n: number; label: string; color: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
      <div className="text-3xl font-bold" style={{ color }}>{n}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function ChartCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}>
      <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      {children}
    </div>
  );
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="mb-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
      {items.map((i, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

function InsightCard({ title, tone, body }: { title: string; tone: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tone }}>{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">{body}</p>
    </div>
  );
}

// silence unused import warning when Sentiment isn't referenced after refactor
export type _S = Sentiment;
