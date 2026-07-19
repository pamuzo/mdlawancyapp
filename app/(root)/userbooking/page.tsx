import UserBooking from "@/components/bookings/userBooking";
import { getBooking } from "@/lib/actions/booking.action";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function UserBookingPage() {
  const session = await getSession();
  const user = session?.user;
  if (!user) redirect("/sign-in");

  const bookings = await getBooking();
  const normalizedBookings = bookings
    .filter((booking) => booking.userId === user?.id)
    .map((booking) => ({
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
  return <UserBooking customer={user} customerBookings={normalizedBookings} />;
}
