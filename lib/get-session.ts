import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";
import { prisma } from "@/db/prisma";

export const getSession = cache(async () => {
  console.log("getsession called ");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      cashBack: true,
      totalDebits: true,
      totalCredit: true,
      totalSpent: true,
      totalJobs: true,
    },
  });

  return {
    ...session,
    user: {
      ...session.user,
      cashBack: user?.cashBack.toNumber() ?? 0,
      totalDebits: user?.totalDebits.toNumber() ?? 0,
      totalCredit: user?.totalCredit.toNumber() ?? 0,
      totalSpent: user?.totalSpent.toNumber() ?? 0,
    },
  };
});
