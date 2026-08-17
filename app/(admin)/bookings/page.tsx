import { getBooking } from "@/lib/actions/booking.action";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import SearchBooking from "./searchBooking";

export default async function Bookings() {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/forbidden");
  if (user?.role !== "admin") {
    redirect("/forbidden");
  }

  const bookings = await getBooking();
  const normalizedBookings = bookings.map((booking) => ({
    ...booking,
    cost: Number(booking.cost),
    deposit: Number(booking.deposit),
    balance: Number(booking.balance),
    overpaid: Number(booking.overpaid),
    totalPrice: Number(booking.totalPrice),
    createdAt:
      booking.createdAt instanceof Date
        ? booking.createdAt.toISOString()
        : booking.createdAt,
    deliveryDate:
      booking.deliveryDate instanceof Date
        ? booking.deliveryDate.toISOString()
        : booking.deliveryDate,
  }));

  return (
    <div className="space-y-6 ">
      <SearchBooking bookings={normalizedBookings} />
    </div>
  );
}
