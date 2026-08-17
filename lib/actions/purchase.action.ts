"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";
import { covertToPlainObject } from "../utils";

export type CreatePurchaseState = {
  success: boolean;
  message: string;
  timestamp?: string;
  errors?: {
    itemName?: string[];
    seller?: string[];
    description?: string[];
    quantity?: string[];
    cost?: string[];
    deposit?: string[];
    paymentMethod?: string[];
  };
};

// to add a new purchase
export async function createPurchase(
  _previousState: CreatePurchaseState,
  formData: FormData,
): Promise<CreatePurchaseState> {
  const itemName = String(formData.get("itemName") ?? "").trim();
  const seller = String(formData.get("seller") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const quantity = Number(formData.get("quantity"));
  const cost = Number(formData.get("cost"));
  const deposit = Number(formData.get("deposit"));

  const paymentMethod = String(formData.get("paymentMethod") ?? "").trim();

  const errors: CreatePurchaseState["errors"] = {};

  // Validation
  if (!itemName) {
    errors.itemName = ["Item name is required"];
  }

  if (!seller) {
    errors.seller = ["Seller is required"];
  }

  if (!description) {
    errors.description = ["Description is required"];
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    errors.quantity = ["Quantity must be a positive integer"];
  }

  if (!Number.isFinite(cost) || cost <= 0) {
    errors.cost = ["Cost must be greater than zero"];
  }

  if (!Number.isFinite(deposit) || deposit < 0) {
    errors.deposit = ["Deposit cannot be negative"];
  }

  if (!paymentMethod) {
    errors.paymentMethod = ["Payment method is required"];
  }

  const totalPrice = quantity * cost;

  if (deposit > totalPrice) {
    errors.deposit = ["Deposit cannot be greater than the total price"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors,
    };
  }

  try {
    const balance = totalPrice - deposit;

    await prisma.purchase.create({
      data: {
        itemName,
        seller,
        description,
        quantity,

        // Convert to Prisma Decimal
        cost,
        deposit,
        balance,
        totalPrice,

        paymentMethod,
      },
    });

    revalidatePath("/purchases");

    return {
      success: true,
      message: "Purchase created successfully.",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("CREATE_PURCHASE_ERROR", error);

    return {
      success: false,
      message: "Unable to create purchase. Please try again.",
    };
  }
}

// to get all purchases
export async function getPurchases() {
  try {
    const purchases = await prisma.purchase.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return covertToPlainObject(purchases);
  } catch (error) {
    console.error("GET_PURCHASES_ERROR", error);
    throw new Error("Unable to fetch purchases. Please try again.");
  }
}
