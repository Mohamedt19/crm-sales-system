import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import type { DashboardSummary } from "../types";

function StatCard({
  title,
  value,
  subtitle,
  tone = "default",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  tone?: "default" | "blue" | "green" | "orange" | "red";
}) {
  const toneStyles: Record<string, string> = {
    default: "border-slate-200 bg-white text-slate-900",
    blue: "border-sky-200 bg-sky-50 text-sky-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    orange: "border-amber-200 bg-amber-50 text-amber-700",
    red: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${toneStyles[tone]}`}>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </div>
      <div className="mt-3 text-4xl font-bold tracking-tight">{value}</div>
      {subtitle ? (
        <div className="mt-3 text-sm text-slate-500">{subtitle}</div>
      ) : null}
    </div>
  );
}

function MiniPipelineCard({
  title,
  value,
  count,
  tone,
}: {
  title: string;
  value: string;
  count: string;
  tone: "blue" | "orange" | "green";
}) {
  const toneStyles: Record<string, string> = {
    blue: "bg-sky-500",
    orange: "bg-amber-500",
    green: "bg-emerald-500",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-800">{title}</div>
        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {count}
        </div>
      </div>

      <div className={`h-2 w-16 rounded-full ${toneStyles[tone]}`} />
      <div className="mt-4 text-sm text-slate-500">Pipeline value</div>
      <div className="mt-1 text-xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    apiRequest<DashboardSummary>("/api/dashboard/summary")
      .then(setSummary)
      .catch(console.error);
  }, []);

  if (!summary) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Leads"
          value={summary.totalLeads}
          subtitle="All leads currently in your CRM"
        />

        <StatCard
          title="New Leads"
          value={summary.newLeads}
          subtitle="Fresh opportunities entering the pipeline"
          tone="blue"
        />

        <StatCard
          title="Qualified"
          value={summary.qualifiedLeads}
          subtitle="Leads that passed initial qualification"
          tone="green"
        />

        <StatCard
          title="Won Deals"
          value={summary.wonLeads}
          subtitle="Successful conversions"
          tone="orange"
        />

        <StatCard
          title="Lost Deals"
          value={summary.lostLeads}
          subtitle="Closed without conversion"
          tone="red"
        />

        <StatCard
          title="Pipeline Value"
          value={`$${summary.pipelineValue.toFixed(2)}`}
          subtitle="Estimated value across active opportunities"
          tone="blue"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Pipeline Snapshot
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                High-level view of lead movement across the funnel.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MiniPipelineCard
              title="New Lead"
              value={`${summary.newLeads} leads`}
              count="Stage 1"
              tone="blue"
            />
            <MiniPipelineCard
              title="Qualified"
              value={`${summary.qualifiedLeads} leads`}
              count="Stage 2"
              tone="orange"
            />
            <MiniPipelineCard
              title="Won"
              value={`${summary.wonLeads} deals`}
              count="Stage 3"
              tone="green"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Sales Summary</h2>
          <p className="mt-1 text-sm text-slate-500">
            Quick summary of CRM health and deal performance.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Active pipeline</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                ${summary.pipelineValue.toFixed(2)}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Open opportunities</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {summary.totalLeads - summary.wonLeads - summary.lostLeads}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Closed outcomes</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {summary.wonLeads + summary.lostLeads}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}