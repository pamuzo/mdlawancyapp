"use server";

import { prisma } from "@/db/prisma";
import { covertToPlainObject } from "@/lib/utils";

// get alatest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    // take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "asc",
    },
    include: {
      images: true,
      features: true,
      tags: true,
    },
  });
  return covertToPlainObject(data);
}

// get Sigle Product by Slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug: slug },
    include: {
      images: true,
      features: true,
      tags: true,
    },
  });
}
