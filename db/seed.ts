import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data.js";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

async function main() {
  const prisma = new PrismaClient({ adapter });
  await prisma.product.deleteMany(); // Clear existing data

  for (const product of sampleData.products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Database seeded successfully.");
}
main();
