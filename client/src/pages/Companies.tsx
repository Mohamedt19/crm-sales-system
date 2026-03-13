import { useEffect, useState, type FormEvent } from "react";
import { apiRequest } from "../lib/api";
import type { Company } from "../types";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [error, setError] = useState("");

  async function loadCompanies() {
    try {
      const data = await apiRequest<Company[]>("/api/companies");
      setCompanies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load companies");
    }
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      const newCompany = await apiRequest<Company>("/api/companies", {
        method: "POST",
        body: JSON.stringify({
          name,
          website,
          industry,
        }),
      });

      setCompanies((prev) => [newCompany, ...prev]);
      setName("");
      setWebsite("");
      setIndustry("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create company");
    }
  }

  async function handleDelete(companyId: number) {
    try {
      await apiRequest(`/api/companies/${companyId}`, {
        method: "DELETE",
      });

      setCompanies((prev) => prev.filter((company) => company.id !== companyId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete company");
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Companies
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage accounts, industries, and company records in your CRM pipeline.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Add Company
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-[1.4fr_1.2fr_1fr]">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Company Name
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Acme Inc"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Website
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://acme.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Industry
                </label>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="SaaS"
                />
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                Add Company
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
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Company Register
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {companies.length} compan{companies.length === 1 ? "y" : "ies"}
            </p>
          </div>
        </div>

        {companies.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
            No companies yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-[1.5fr_1.4fr_1fr_0.7fr_120px] border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <div>Company</div>
              <div>Website</div>
              <div>Industry</div>
              <div className="text-center">Leads</div>
              <div className="text-center">Actions</div>
            </div>

            {companies.map((company) => (
              <div
                key={company.id}
                className="grid grid-cols-[1.5fr_1.4fr_1fr_0.7fr_120px] items-center border-b border-slate-200 px-6 py-4 text-sm last:border-b-0 hover:bg-slate-50"
              >
                <div className="font-semibold text-slate-900">{company.name}</div>

                <div className="truncate text-slate-600">
                  {company.website || "No website"}
                </div>

                <div className="text-slate-600">
                  {company.industry || "No industry"}
                </div>

                <div className="text-center font-semibold text-slate-700">
                  {company._count?.leads ?? 0}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => handleDelete(company.id)}
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