"use server";
import { prisma } from "@/db/prisma";

// get all user{customer}
export async function allCustomers() {
  const data = await prisma.user.findMany({
    orderBy: {
      role: "asc",
    },
  });
  return data;
}

export async function searchUsers(search: string) {
  if (!search || search.length < 2) {
    return [];
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          userName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          businessName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phoneNumber: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },

    select: {
      id: true,
      name: true,
      userName: true,
      email: true,
      image: true,
      businessName: true,
      phoneNumber: true,
    },

    take: 10,
  });

  return users;
}
