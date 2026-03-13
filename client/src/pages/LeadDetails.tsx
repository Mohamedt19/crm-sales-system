import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { apiRequest } from "../lib/api";
import type { Lead, Note, LeadStage } from "../types";

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

export default function LeadDetails() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");

  async function loadLead() {
    if (!id) return;
    const data = await apiRequest<Lead>(`/api/leads/${id}`);
    setLead(data);
  }

  useEffect(() => {
    loadLead().catch(console.error);
  }, [id]);

  async function handleStageChange(stage: LeadStage) {
    if (!id) return;

    setError("");

    try {
      const updated = await apiRequest<Lead>(`/api/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ stage }),
      });

      setLead(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update stage");
    }
  }

  async function handleNoteSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id || !noteContent.trim()) return;

    setError("");

    try {
      const newNote = await apiRequest<Note>(`/api/leads/${id}/notes`, {
        method: "POST",
        body: JSON.stringify({ content: noteContent }),
      });

      setLead((prev) =>
        prev
          ? {
              ...prev,
              notes: [newNote, ...prev.notes],
            }
          : prev
      );

      setNoteContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add note");
    }
  }

  if (!lead) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Loading lead...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Lead Record
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {lead.name}
            </h1>

            <div className="mt-4">
              <StageBadge stage={lead.stage} />
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600">
              <div>
                <span className="font-medium text-slate-700">Email:</span>{" "}
                {lead.email || "No email"}
              </div>
              <div>
                <span className="font-medium text-slate-700">Phone:</span>{" "}
                {lead.phone || "No phone"}
              </div>
              <div>
                <span className="font-medium text-slate-700">Company:</span>{" "}
                {lead.company?.name || "No company"}
              </div>
              <div>
                <span className="font-medium text-slate-700">Created:</span>{" "}
                {new Date(lead.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Opportunity Value
            </div>

            <div className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              {lead.value != null ? `$${lead.value.toFixed(2)}` : "—"}
            </div>

            <Link
              to={`/leads/${lead.id}/edit`}
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              Edit Lead
            </Link>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Update Stage
          </div>

          <div className="flex flex-wrap gap-2">
            {stageOptions.map((stage) => {
              const isActive = lead.stage === stage;

              return (
                <button
                  key={stage}
                  onClick={() => handleStageChange(stage)}
                  disabled={isActive}
                  className={
                    isActive
                      ? "rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700"
                      : "rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  }
                >
                  {stage}
                </button>
              );
            })}
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Add Note
          </div>

          <form onSubmit={handleNoteSubmit} className="space-y-4">
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write a note about this lead..."
              className="min-h-32 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              Add Note
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Notes</h2>
            <p className="text-sm text-slate-500">
              {lead.notes.length} note{lead.notes.length === 1 ? "" : "s"}
            </p>
          </div>

          {lead.notes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500">
              No notes yet.
            </div>
          ) : (
            <div className="space-y-3">
              {lead.notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-sm leading-7 text-slate-800">
                    {note.content}
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}