import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../lib/api";
import type { Company, Lead, LeadStage } from "../types";

function StageBadge({ stage }: { stage: string }) {
  const styles: Record<string, string> = {
    new: "border-sky-200 bg-sky-50 text-sky-700",
    contacted: "border-cyan-200 bg-cyan-50 text-cyan-700",
    qualified: "border-emerald-200 bg-emerald-50 text-emerald-700",
    proposal: "border-amber-200 bg-amber-50 text-amber-700",
    won: "border-violet-200 bg-violet-50 text-violet-700",
    lost: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${styles[stage] ?? "border-slate-200 bg-slate-50 text-slate-700"}`}
    >
      {stage}
    </span>
  );
}

const stageOptions: LeadStage[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<LeadStage>("new");
  const [value, setValue] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const [leadData, companyData] = await Promise.all([
        apiRequest<Lead[]>("/api/leads"),
        apiRequest<Company[]>("/api/companies"),
      ]);

      setLeads(leadData);
      setCompanies(companyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const newLead = await apiRequest<Lead>("/api/leads", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          stage,
          value: value ? Number(value) : null,
          companyId: companyId ? Number(companyId) : null,
        }),
      });

      setLeads((prev) => [newLead, ...prev]);
      setName("");
      setEmail("");
      setPhone("");
      setStage("new");
      setValue("");
      setCompanyId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create lead");
    }
  }

  async function handleDelete(leadId: number) {
    try {
      await apiRequest(`/api/leads/${leadId}`, {
        method: "DELETE",
      });

      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete lead");
    }
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        (lead.email || "").toLowerCase().includes(search.toLowerCase());

      const matchesStage =
        stageFilter === "all" ? true : lead.stage === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [leads, search, stageFilter]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Leads
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create leads, assign them to companies, and track movement through
            the sales pipeline.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Add Lead
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Lead Name
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Phone
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 555 000 0000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Stage
                </label>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={stage}
                  onChange={(e) => setStage(e.target.value as LeadStage)}
                >
                  {stageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Potential Value
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  type="number"
                  step="0.01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Company
                </label>
                <select
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                >
                  <option value="">No company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                Add Lead
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Search
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Stage Filter
            </label>
            <select
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
            >
              <option value="all">All stages</option>
              {stageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Lead Register
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredLeads.length} lead{filteredLeads.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
            No leads found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_80px_160px] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <div>Lead</div>
              <div>Company</div>
              <div>Stage</div>
              <div>Value</div>
              <div className="text-center">Notes</div>
              <div className="text-center">Actions</div>
            </div>

            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_80px_160px] items-center border-b border-slate-200 px-6 py-4 text-sm last:border-b-0 hover:bg-slate-50"
              >
                <Link to={`/leads/${lead.id}`} className="min-w-0">
                  <div className="font-semibold text-slate-900">{lead.name}</div>
                  <div className="mt-1 truncate text-xs text-slate-500">
                    {lead.email || "No email"}
                  </div>
                </Link>

                <div className="text-slate-600">
                  {lead.company?.name || "No company"}
                </div>

                <div>
                  <StageBadge stage={lead.stage} />
                </div>

                <div className="font-semibold text-slate-900">
                  {lead.value != null ? `$${lead.value.toFixed(2)}` : "—"}
                </div>

                <div className="text-center font-semibold text-slate-700">
                  {lead.notes.length}
                </div>

                <div className="flex justify-center gap-2">
                  <Link
                    to={`/leads/${lead.id}/edit`}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}