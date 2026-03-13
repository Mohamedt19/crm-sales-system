import prisma from "../prisma/client.js";

export async function createNote(leadId, data) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  });

  if (!lead) {
    const err = new Error("Lead not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.note.create({
    data: {
      content: data.content,
      leadId,
    },
  });
}

export async function findNotesByLeadId(leadId) {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
  });

  if (!lead) {
    const err = new Error("Lead not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.note.findMany({
    where: { leadId },
    orderBy: { createdAt: "desc" },
  });
}