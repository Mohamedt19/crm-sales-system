import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding crm_sales_db...");

  await prisma.note.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("123456", 10);

  await Promise.all([
    prisma.user.create({
      data: {
        name: "Mohamed",
        email: "mohamed@example.com",
        password: passwordHash,
      },
    }),
    prisma.user.create({
      data: {
        name: "Sara",
        email: "sara@example.com",
        password: passwordHash,
      },
    }),
  ]);

  const [novaTech, blueWave, atlasSoft, greenGrid, summitWorks] =
    await Promise.all([
      prisma.company.create({
        data: {
          name: "NovaTech",
          website: "https://novatech.com",
          industry: "Software",
        },
      }),
      prisma.company.create({
        data: {
          name: "BlueWave Logistics",
          website: "https://bluewave.com",
          industry: "Logistics",
        },
      }),
      prisma.company.create({
        data: {
          name: "AtlasSoft",
          website: "https://atlassoft.com",
          industry: "SaaS",
        },
      }),
      prisma.company.create({
        data: {
          name: "GreenGrid Energy",
          website: "https://greengrid.com",
          industry: "Energy",
        },
      }),
      prisma.company.create({
        data: {
          name: "Summit Works",
          website: "https://summitworks.com",
          industry: "Consulting",
        },
      }),
    ]);

  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        name: "Jane Carter",
        email: "jane@novatech.com",
        phone: "+1 555 100 1001",
        stage: "new",
        value: 5000,
        companyId: novaTech.id,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Michael Reed",
        email: "michael@bluewave.com",
        phone: "+1 555 100 1002",
        stage: "contacted",
        value: 12000,
        companyId: blueWave.id,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Olivia Stone",
        email: "olivia@atlassoft.com",
        phone: "+1 555 100 1003",
        stage: "qualified",
        value: 22000,
        companyId: atlasSoft.id,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Daniel Brooks",
        email: "daniel@greengrid.com",
        phone: "+1 555 100 1004",
        stage: "proposal",
        value: 35000,
        companyId: greenGrid.id,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Sophia Turner",
        email: "sophia@summitworks.com",
        phone: "+1 555 100 1005",
        stage: "won",
        value: 18000,
        companyId: summitWorks.id,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Ethan Hall",
        email: "ethan@novatech.com",
        phone: "+1 555 100 1006",
        stage: "lost",
        value: 9000,
        companyId: novaTech.id,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Ava Bennett",
        email: "ava@bluewave.com",
        phone: "+1 555 100 1007",
        stage: "new",
        value: 7500,
        companyId: blueWave.id,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Noah Foster",
        email: "noah@atlassoft.com",
        phone: "+1 555 100 1008",
        stage: "qualified",
        value: 27000,
        companyId: atlasSoft.id,
      },
    }),
  ]);

  const byName = Object.fromEntries(leads.map((lead) => [lead.name, lead]));

  await Promise.all([
    prisma.note.create({
      data: {
        leadId: byName["Jane Carter"].id,
        content: "Initial outreach planned for next week.",
      },
    }),
    prisma.note.create({
      data: {
        leadId: byName["Michael Reed"].id,
        content: "Had first discovery call. Interested in team plan.",
      },
    }),
    prisma.note.create({
      data: {
        leadId: byName["Olivia Stone"].id,
        content: "Qualified budget and technical requirements.",
      },
    }),
    prisma.note.create({
      data: {
        leadId: byName["Daniel Brooks"].id,
        content: "Proposal sent and waiting for internal approval.",
      },
    }),
    prisma.note.create({
      data: {
        leadId: byName["Sophia Turner"].id,
        content: "Deal closed successfully. Onboarding to start Monday.",
      },
    }),
    prisma.note.create({
      data: {
        leadId: byName["Noah Foster"].id,
        content: "Strong fit. Requested pricing comparison against competitor.",
      },
    }),
  ]);

  console.log("Seed completed.");
  console.log("");
  console.log("Demo users:");
  console.log("1) mohamed@example.com / 123456");
  console.log("2) sara@example.com / 123456");
  console.log("");
  console.log("Companies: 5");
  console.log("Leads: 8");
  console.log("Notes: 6");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });