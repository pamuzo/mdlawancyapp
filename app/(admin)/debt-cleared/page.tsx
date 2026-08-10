import Debt from "@/components/bookings/debt";
import { getDebtCleared } from "@/lib/actions/debt.actions";

export default async function DebtCleared() {
  const debts = await getDebtCleared();

  return (
    <>
      <Debt debts={debts} />
    </>
  );
}
