import { ProfileStats } from "@/components/profile/profile-stats";

import { allCustomers } from "@/lib/actions/customers.action";
import { getBooking } from "@/lib/actions/booking.action";
import SearchCustomer from "./searchCustomer";

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const customers = await allCustomers();
  const bookings = await getBooking();
  const customerBookings = bookings
    .filter((booking) => booking.userId === id)
    .map((booking) => ({
      ...booking,
      cost: booking.cost,
      deposit: booking.deposit,
      balance: booking.balance,
      overpaid: booking.overpaid,
      totalPrice: booking.totalPrice,
      createdAt: booking.createdAt.toString(),
      deliveryDate: booking.deliveryDate?.toString(),
    }));

  const customer = customers.find((customer) => customer?.id === id);

  return (
    <div className="flex flex-col gap-4">
      <div>This is the customers {customer?.name}</div>
      {customer ? (
        <>
          <ProfileStats
            user={{
              ...customer,
              cashBack: customer.cashBack.toString(),
              totalCredit: customer.totalCredit.toString(),
              totalDebits: customer.totalDebits.toString(),
              totalSpent: customer.totalSpent.toString(),
              phoneNumber: customer.phoneNumber ?? "",
            }}
          />
          <SearchCustomer
            customer={customer}
            customerBookings={customerBookings}
          />
        </>
      ) : null}
    </div>
  );
}
