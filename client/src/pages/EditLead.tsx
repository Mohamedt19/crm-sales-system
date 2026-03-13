import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";
import type { Company, Lead, LeadStage } from "../types";

const stageOptions: LeadStage[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

export default function EditLead() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<LeadStage>("new");
  const [value, setValue] = useState("");
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    async function load() {
      if (!id) return;

      try {
        const [lead, companyList] = await Promise.all([
          apiRequest<Lead>(`/api/leads/${id}`),
          apiRequest<Company[]>("/api/companies"),
        ]);

        setName(lead.name);
        setEmail(lead.email || "");
        setPhone(lead.phone || "");
        setStage(lead.stage);
        setValue(lead.value != null ? String(lead.value) : "");
        setCompanyId(lead.company ? String(lead.company.id) : "");
        setCompanies(companyList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load lead");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id) return;

    setError("");

    try {
      await apiRequest<Lead>(`/api/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          email,
          phone,
          stage,
          value: value ? Number(value) : null,
          companyId: companyId ? Number(companyId) : null,
        }),
      });

      navigate(`/leads/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update lead");
    }
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Loading lead...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Edit Lead
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Edit Lead
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Update lead details, pipeline stage, opportunity value, and company
            assignment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Lead Name
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lead name"
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
                placeholder="lead@example.com"
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

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate(`/leads/${id}`)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </section>
    </div>
  );
}