import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getBooking } from "@/lib/actions/booking.action";
import { getSession } from "@/lib/get-session";
import Link from "next/link";
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

  const pendingBookings = bookings.filter((b) => b.status === "PENDING").length;

  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.totalPrice),
    0,
  );

  return (
    <div className="space-y-6 p-6">
      <Link href={"/add-bookings"}>
        <h1 className="text-2xl font-bold">Add New Booking</h1>
      </Link>

      <div>
        <p className="text-muted-foreground">
          Manage customer bookings and jobs.
        </p>
      </div>
      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              ₦{totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{pendingBookings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{completedBookings}</p>
          </CardContent>
        </Card>
      </div>
      <SearchBooking bookings={bookings} />
    </div>
  );
}
