import Link from "next/link";
import { Button } from "../ui/button";
import { getBooking } from "@/lib/actions/booking.action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  user: {
    emailVerified?: boolean;
    id: string;
  };
};

export function SecurityCard({ user }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">Security</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <h3 className="font-medium">Email Verification</h3>

            <p className="text-sm text-slate-500">Verify your email address</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm ${
              user.emailVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.emailVerified ? (
              "Verified"
            ) : (
              <Link href="/verify-email">Verify</Link>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <h3 className="font-medium">Password</h3>

            <p className="text-sm text-slate-500">Update your password</p>
          </div>

          <Button variant="outline" className="rounded-lg">
            Change
          </Button>
        </div>

        <div className="flex items-center justify-between rounded-xl border p-4">
          <div>
            <h3 className="font-medium">Two-Factor Authentication</h3>

            <p className="text-sm text-slate-500">
              Add another layer of security
            </p>
          </div>

          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}

export async function RecentActivities({ user }: Props) {
  const bookings = await getBooking();
  const userbooking = bookings
    .filter((booking) => booking.userId === user.id)
    .slice(0, 7);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">Recent Activities</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Type</TableHead>
            <TableHead>Total Cost(₦)</TableHead>
            <TableHead>Deposit(₦)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userbooking.map((booking, key) => {
            const stockLevel =
              booking.balance === 0 ? 2 : booking.balance > 1 ? 0 : 2;
            const bgColor = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
            const textColor = [
              "text-red-600",
              "text-yellow-600",
              "text-green-600",
            ];
            return (
              <TableRow key={key}>
                <TableCell className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${bgColor[stockLevel]}`}
                  />
                  <span className="text-sm font-medium ">
                    {booking.jobType}
                  </span>
                </TableCell>
                <TableCell className="text-sm font-medium">
                  {booking.totalPrice.toLocaleString()}
                </TableCell>
                <TableCell
                  className={`text-sm font-medium ${textColor[stockLevel]}`}
                >
                  {booking.deposit.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
