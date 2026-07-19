import { getBooking } from "@/lib/actions/booking.action";
import BookingDetails from "@/components/bookings/bookingDetails";

export default async function ViewBooking({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const bookings = await getBooking();
  const booking = bookings
    .filter((booking) => booking.id === id)
    .map((booking) => ({
      ...booking,
      user: {
        ...booking.user,
        phoneNumber: booking.user.phoneNumber || undefined,
      },
    }));

  return BookingDetails(booking);
}
