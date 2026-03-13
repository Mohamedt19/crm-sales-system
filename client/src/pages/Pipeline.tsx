import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { apiRequest } from "../lib/api";
import type { Lead, LeadStage } from "../types";

const stages: LeadStage[] = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "won",
  "lost",
];

function StageColumn({
  stage,
  count,
  children,
}: {
  stage: LeadStage;
  count: number;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  return (
    <section
      ref={setNodeRef}
      className={`rounded-xl border bg-white p-4 shadow-sm transition ${
        isOver ? "border-sky-400 bg-sky-50" : "border-slate-200"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold capitalize text-slate-700">
          {stage}
        </div>
        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
          {count}
        </div>
      </div>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: String(lead.id),
      data: {
        leadId: lead.id,
        currentStage: lead.stage,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Link
      to={`/leads/${lead.id}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`block rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm transition hover:bg-slate-100 ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      <div className="font-semibold text-slate-800">{lead.name}</div>

      <div className="mt-1 text-xs text-slate-500">
        {lead.company?.name || "No company"}
      </div>

      <div className="mt-2 text-xs font-semibold text-slate-700">
        {lead.value != null ? `$${lead.value.toFixed(2)}` : "—"}
      </div>
    </Link>
  );
}

export default function Pipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);

  async function loadLeads() {
    const data = await apiRequest<Lead[]>("/api/leads");
    setLeads(data);
  }

  useEffect(() => {
    loadLeads().catch(console.error);
  }, []);

  function leadsByStage(stage: LeadStage) {
    return leads.filter((lead) => lead.stage === stage);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const leadId = Number(active.id);
    const nextStage = over.id as LeadStage;

    const draggedLead = leads.find((lead) => lead.id === leadId);
    if (!draggedLead) return;
    if (draggedLead.stage === nextStage) return;

    const previousLeads = leads;

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, stage: nextStage } : lead
      )
    );

    try {
      await apiRequest(`/api/leads/${leadId}`, {
        method: "PATCH",
        body: JSON.stringify({ stage: nextStage }),
      });
    } catch (error) {
      console.error(error);
      setLeads(previousLeads);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid gap-4 xl:grid-cols-6">
          {stages.map((stage) => {
            const stageLeads = leadsByStage(stage);

            return (
              <StageColumn key={stage} stage={stage} count={stageLeads.length}>
                {stageLeads.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-6 text-center text-xs text-slate-400">
                    Drop lead here
                  </div>
                ) : (
                  stageLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
                )}
              </StageColumn>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}