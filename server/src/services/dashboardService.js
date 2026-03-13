import prisma from "../prisma/client.js";

export async function getDashboardSummary() {
  const [
    totalLeads,
    newLeads,
    qualifiedLeads,
    wonLeads,
    lostLeads,
    pipelineValueAgg,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { stage: "new" } }),
    prisma.lead.count({ where: { stage: "qualified" } }),
    prisma.lead.count({ where: { stage: "won" } }),
    prisma.lead.count({ where: { stage: "lost" } }),
    prisma.lead.aggregate({
      _sum: { value: true },
      where: {
        stage: {
          in: ["new", "contacted", "qualified", "proposal"],
        },
      },
    }),
  ]);

  return {
    totalLeads,
    newLeads,
    qualifiedLeads,
    wonLeads,
    lostLeads,
    pipelineValue: pipelineValueAgg._sum.value ?? 0,
  };
}