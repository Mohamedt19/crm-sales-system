import prisma from "../prisma/client.js";

export function createLead(data) {
  return prisma.lead.create({
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      stage: data.stage ?? "new",
      value: data.value ?? null,
      companyId: data.companyId ?? null,
    },
    include: {
      company: true,
      notes: true,
    },
  });
}

export function findLeads() {
  return prisma.lead.findMany({
    include: {
      company: true,
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export function findLeadById(id) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      company: true,
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function updateLead(id, data) {
  const existing = await prisma.lead.findUnique({
    where: { id },
  });

  if (!existing) {
    const err = new Error("Lead not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.lead.update({
    where: { id },
    data: {
      name: data.name ?? existing.name,
      email: data.email === "" ? null : data.email ?? existing.email,
      phone: data.phone === "" ? null : data.phone ?? existing.phone,
      stage: data.stage ?? existing.stage,
      value: data.value ?? existing.value,
      companyId: data.companyId ?? existing.companyId,
    },
    include: {
      company: true,
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function deleteLead(id) {
  const existing = await prisma.lead.findUnique({
    where: { id },
  });

  if (!existing) {
    const err = new Error("Lead not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.lead.delete({
    where: { id },
  });
}