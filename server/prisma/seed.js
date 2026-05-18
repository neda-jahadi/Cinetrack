import { PrismaClient } from "@prisma/client";
import fs from "fs";

const locations = JSON.parse(
  fs.readFileSync("./prisma/data/sweden-locations.json", "utf-8")
);

const prisma = new PrismaClient();


async function main() {
  for (const region of locations) {
    const savedRegion = await prisma.region.upsert({
      where: { code: region.code },
      update: { name: region.name },
      create: {
        code: region.code,
        name: region.name,
      },
    });

    for (const municipality of region.municipalities) {
      await prisma.municipality.upsert({
        where: { code: municipality.code },
        update: {
          name: municipality.name,
          regionId: savedRegion.id,
        },
        create: {
          code: municipality.code,
          name: municipality.name,
          regionId: savedRegion.id,
        },
      });
    }
  }
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