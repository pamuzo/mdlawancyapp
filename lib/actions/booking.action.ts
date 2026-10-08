"use server";

import { prisma } from "@/db/prisma";
import { covertToPlainObject } from "../utils";

export type BookingActionState = {
  success: boolean;
  message: string;
  timestamp: string;
};

// create a new booking
export async function createBooking(
  _previousState: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  try {
    const userId = formData.get("userId") as string;
    const jobType = formData.get("jobType") as string;
    const jobDetails = formData.get("jobDetails") as string;

    const quantity = Number(formData.get("quantity"));
    const cost = Number(formData.get("cost"));
    const deposit = Number(formData.get("deposit"));

    const paymentMethod = formData.get("paymentMethod") as string;
    const deliveryDate = formData.get("deliveryDate") as string;

    //  && { totalCredit: 0 },
    if (paymentMethod === "CREDIT") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          totalCredit: 0,
          // ...(formData.get("paymentMethod") === "CREDIT" && { totalCredit: 0 }),
        },
      });
    }

    let overpaid;
    const totalPrice = quantity * cost;
    let balance = totalPrice - deposit;

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
        timestamp: new Date().toISOString(),
      };
    }
    if (!formData.get("paymentMethod")) {
      return {
        success: false,
        message: "Include a payment method",
        timestamp: new Date().toISOString(),
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
        // ...(formData.get("paymentMethod") === "CREDIT" && { totalCredit: 0 }),
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
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "something want wrong",
      timestamp: new Date().toISOString(),
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
    include: {
      user: true,
    },
  });
  return covertToPlainObject(data);
}

// to  cancel a booking
export async function cancelBooking(prevState: any, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const bookingId = formData.get("bookingId") as string;
    const balance = Number(formData.get("balance"));
    const totalPrice = Number(formData.get("totalPrice"));
    const quantity = Number(formData.get("quantity"));

    if (!userId || !bookingId) {
      return {
        success: false,
        message: "Missing required fields",
      };
    }

    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "CANCELLED",
        quantity: 0,
        totalPrice: 0,
        deposit: 0,
        balance: 0,
        paymentMethod: "none",
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        totalDebits: {
          decrement: balance,
        },
        totalSpent: {
          decrement: totalPrice,
        },
        totalJobs: {
          decrement: quantity,
        },
      },
    });

    return {
      success: true,
      message: "Booking canceled successfully",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "something went wrong",
    };
  }
}

// to  delete  a booking
export async function deleteBooking(prevState: any, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const bookingId = formData.get("bookingId") as string;
    const balance = Number(formData.get("balance"));
    const totalPrice = Number(formData.get("totalPrice"));
    const quantity = Number(formData.get("quantity"));

    if (!userId || !bookingId) {
      return {
        success: false,
        message: "Missing required fields",
      };
    }

    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        totalDebits: {
          decrement: balance,
        },
        totalSpent: {
          decrement: totalPrice,
        },
        totalJobs: {
          decrement: quantity,
        },
      },
    });

    return {
      success: true,
      message: "Booking deleted successfully",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "something went wrong",
    };
  }
}

// to complete a booking  status
export async function CompleteStatus(bookingId: string) {
  try {
    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "COMPLETED",
      },
    });
    return {
      success: true,
      message: "Booking completed successfully",
      timestamp: Date.now(),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.body?.message || error?.message || "something went wrong",
    };
  }
}
