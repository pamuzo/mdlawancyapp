import { prisma } from "@/db/prisma";
import { covertToPlainObject } from "../utils";

// get all debt cleared
export async function getDebtCleared() {
  const data = await prisma.debts.findMany({
    // take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  return covertToPlainObject(data);
}
