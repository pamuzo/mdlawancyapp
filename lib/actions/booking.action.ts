"use server";

import { prisma } from "@/db/prisma";
import { covertToPlainObject } from "../utils";

// create a new booking
export async function createBooking(prevState: any, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const jobType = formData.get("jobType") as string;
    const jobDetails = formData.get("jobDetails") as string;

    const quantity = Number(formData.get("quantity"));
    const cost = Number(formData.get("cost"));
    const deposit = Number(formData.get("deposit"));

    const paymentMethod = formData.get("paymentMethod") as string;
    const deliveryDate = formData.get("deliveryDate") as string;

    const totalPrice = quantity * cost;
    let balance = totalPrice - deposit;
    let overpaid;

    if (balance < 0) {
      overpaid = deposit - totalPrice;
      balance = 0;
    } else {
      overpaid = 0;
      balance = totalPrice - deposit;
    }

    if (!formData.get("deliveryDate")) {
      return {
        success: false,
        message: "Include a delivery date",
      };
    }

    await prisma.booking.create({
      data: {
        userId,
        jobType,
        jobDetails,
        // overpaid,
        quantity,
        cost,
        deposit,
        totalPrice,
        balance,
        paymentMethod,
        deliveryDate: new Date(deliveryDate),
      },
    });
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        totalJobs: {
          increment: quantity,
        },
        totalDebits: {
          increment: balance, // adds only unpaid amount
        },
        totalSpent: {
          increment: totalPrice, // adds only unpaid amount
        },
        totalCredit: {
          increment: overpaid, // adds only unpaid amount
        },
      },
    });
    return {
      success: true,
      message: "Booked successfully",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "something want wrong",
    };
  }
}

// get all booking
export async function getBooking() {
  const data = await prisma.booking.findMany({
    // take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
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
        timestamp: Date.now(),
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
  console.log([...formData.entries()]);
  try {
    const userId = formData.get("userId") as string;
    const bookingId = formData.get("bookingId") as string;
    const amount = Number(formData.get("amount"));
    const paymentMethod = formData.get("paymentMethod") as string;
    console.log([...formData.entries()]);

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
