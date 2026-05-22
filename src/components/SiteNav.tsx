import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-sm font-bold tracking-tight text-primary">
          Restaurant Sentiment
        </Link>
        <nav className="flex gap-1 text-sm">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-md px-3 py-1.5 bg-secondary text-primary font-semibold" }}
          >
            Analyzer
          </Link>
          <Link
            to="/dashboard"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-md px-3 py-1.5 bg-secondary text-primary font-semibold" }}
          >
            Dashboard
          </Link>
          <Link
            to="/finassist"
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-md px-3 py-1.5 bg-secondary text-primary font-semibold" }}
          >
            FinAssist
          </Link>
        </nav>
      </div>
    </header>
  );
}
