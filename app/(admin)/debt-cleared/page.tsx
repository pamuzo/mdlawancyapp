import Debt from "@/components/bookings/debt";
import { getDebtCleared } from "@/lib/actions/debt.actions";

export default async function DebtCleared() {
  const debts = await getDebtCleared();
  const allDebts = debts.map((debt) => ({
    ...debt,
    amount: Number(debt.amount),
    createdAt: debt.createdAt.toString(),
  }));

  return (
    <>
      <Debt debts={allDebts} />
    </>
  );
}
