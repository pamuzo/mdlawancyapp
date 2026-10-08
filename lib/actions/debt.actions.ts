"use server";

import { prisma } from "@/db/prisma";
import { covertToPlainObject } from "../utils";

// get all debt cleared
export async function getDebtCleared() {
  const data = await prisma.debts.findMany({
    // take: 15,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });
  return covertToPlainObject(data);
}

//  to clear single  debt
export async function createDebt(prevState: any, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const bookingId = formData.get("bookingId") as string;
    const amount = Number(formData.get("amount"));
    const paymentMethod = formData.get("paymentMethod") as string;

    if (!userId || !bookingId || !amount || !paymentMethod) {
      return {
        success: false,
        message: "Missing required fields",
      };
    }

    await prisma.debts.create({
      data: {
        userId,
        bookingId,
        amount,
        paymentMethod,
      },
    });

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        balance: true,
      },
    });

    if (!booking) {
      return {
        success: false,
        message: "Booking not found.",
        timestamp: new Date().toISOString(),
      };
    }

    const balance = Number(booking.balance);
    if (amount > balance) {
      return {
        success: false,
        message: "Payment amount cannot exceed the outstanding balance.",
        timestamp: Date.now(),
      };
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        totalDebits: {
          decrement: amount,
        },
      },
    });

    return {
      success: true,
      message: "Debt cleared successfully",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "something want wrong",
    };
  }
}

// clear all debts for a user
export async function clearAllDebts(prevState: any, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const bookingId = formData.get("bookingId") as string;
    const amount = Number(formData.get("amount"));
    const paymentMethod = formData.get("paymentMethod") as string;

    if (!userId || !bookingId || !amount || !paymentMethod) {
      return {
        success: false,
        message: "Missing required fields",
      };
    }
    await prisma.debts.create({
      data: {
        userId,
        bookingId,
        amount,
        paymentMethod,
      },
    });

    await prisma.booking.updateMany({
      where: { userId },
      data: {
        balance: 0,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        totalDebits: {
          decrement: amount,
        },
      },
    });

    return {
      success: true,
      message: "All debts cleared successfully",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "something want wrong",
    };
  }
}
// Add money to a user's account
export async function addMoney(_prevState: unknown, formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  const amount = Number(formData.get("amount"));
  const paymentMethod = String(formData.get("paymentMethod") ?? "");

  if (!userId || !Number.isFinite(amount) || amount <= 0) {
    return { success: false, message: "Enter a valid amount" };
  }

  if (!paymentMethod) {
    return { success: false, message: "Select a payment method" };
  }

  try {
    await prisma.$transaction([
      prisma.moneyAdded.create({
        data: {
          userId,
          amount,
          paymentMethod,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { totalCredit: { increment: amount } },
      }),
    ]);

    return { success: true, message: "Money added successfully" };
  } catch (error: unknown) {
    console.error("Failed to add money", { userId, amount, paymentMethod, error });

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return { success: false, message: "Customer not found" };
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2003"
    ) {
      return { success: false, message: "The selected customer is invalid" };
    }

    return {
      success: false,
      message: "Could not add money. Please try again or check the server logs.",
    };
  }
}
