import prisma from "../prisma/client.js";

export function createCompany(data) {
  return prisma.company.create({
    data: {
      name: data.name,
      website: data.website || null,
      industry: data.industry || null,
    },
  });
}

export function findCompanies() {
  return prisma.company.findMany({
    include: {
      _count: {
        select: { leads: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export function findCompanyById(id) {
  return prisma.company.findUnique({
    where: { id },
    include: {
      leads: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function updateCompany(id, data) {
  const existing = await prisma.company.findUnique({
    where: { id },
  });

  if (!existing) {
    const err = new Error("Company not found");
    err.statusCode = 404;
    throw err;
  }

  return prisma.company.update({
    where: { id },
    data: {
      name: data.name ?? existing.name,
      website: data.website === "" ? null : data.website ?? existing.website,
      industry: data.industry === "" ? null : data.industry ?? existing.industry,
    },
  });
}

export async function deleteCompany(id) {
  const existing = await prisma.company.findUnique({
    where: { id },
    include: {
      _count: {
        select: { leads: true },
      },
    },
  });

  if (!existing) {
    const err = new Error("Company not found");
    err.statusCode = 404;
    throw err;
  }

  if (existing._count.leads > 0) {
    const err = new Error("Cannot delete company with existing leads");
    err.statusCode = 400;
    throw err;
  }

  return prisma.company.delete({
    where: { id },
  });
}