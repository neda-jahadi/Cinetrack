import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.job.deleteMany();
  await prisma.company.deleteMany();

  const company = await prisma.company.create({
    data: {
      name: "FlightFlow",
      description: "Modern travel platform",
      contactEmail: "hr@flightflow.com",
      contactPhone: "0700000000",
    },
  });

  await prisma.job.createMany({
    data: [
      {
        title: "Frontend Developer",
        type: "Full_Time",
        description: "Build modern React and TypeScript applications for customer-facing products.",
        salary: "50000",
        location: "Gothenburg",
        companyId: company.id,
      },
      {
        title: "Fullstack Developer",
        type: "Contract",
        description: "Develop scalable frontend and backend features in a travel technology platform.",
        salary: "55000",
        location: "Stockholm",
        companyId: company.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeded successfully");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });