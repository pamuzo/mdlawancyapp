import { ProfileStats } from "@/components/profile/profile-stats";

import { allCustomers } from "@/lib/actions/customers.action";
import { getBooking } from "@/lib/actions/booking.action";
import UserBooking from "../../../../components/bookings/userBooking";
import { CURRENCY } from "@/lib/constants";
import { getDebtCleared, getFundingRecords } from "@/lib/actions/debt.actions";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const customers = await allCustomers();
  const bookings = await getBooking();
  const funding = await getFundingRecords();
  const customerBookings = bookings
    .filter((booking) => booking.userId === id)
    .map((booking) => ({
      ...booking,
      cost: Number(booking.cost),
      deposit: Number(booking.deposit),
      balance: Number(booking.balance),
      overpaid: Number(booking.overpaid),
      totalPrice: Number(booking.totalPrice),
      createdAt: booking.createdAt.toString(),
      deliveryDate: booking.deliveryDate?.toString(),
      user: {
        ...booking.user,
        cashBack: booking.user.cashBack.toString(),
        totalCredit: booking.user.totalCredit.toString(),
        totalDebits: booking.user.totalDebits.toString(),
        totalSpent: booking.user.totalSpent.toString(),
        previousDebits: booking.user.previousDebits.toString(),
        totalJobs: booking.user.totalJobs.toString(),
        phoneNumber: booking.user.phoneNumber ?? "",
      },
    }));
  // .slice(0, 20);

  const customer = customers.find((customer) => customer?.id === id);
  const debts = await getDebtCleared();
  const customerDebts = debts.filter((debt) => debt.userId === id).slice(0, 10);
  const customerFunding = funding
    .filter((fund) => fund.userId === id)
    .slice(0, 10);

  return (
    <div className="flex flex-col gap-4">
      <div> Customers: {customer?.name}</div>
      <div>
        Total Spent: {CURRENCY}
        {Number(customer?.totalSpent)?.toLocaleString()}
      </div>
      {customer ? (
        <>
          <ProfileStats
            user={{
              ...customer,
              cashBack: customer.cashBack.toString(),
              totalCredit: customer.totalCredit.toString(),
              totalDebits: customer.totalDebits.toString(),
              totalSpent: customer.totalSpent.toString(),
              previousDebits: customer.previousDebits.toString(),
              totalJobs: customer.totalJobs.toString(),
              phoneNumber: customer.phoneNumber ?? "",
            }}
          />
          <UserBooking
            customer={customer}
            customerBookings={customerBookings}
            customerDebts={customerDebts}
            customerFunding={customerFunding}
          />
        </>
      ) : null}
    </div>
  );
}
