import { allCustomers } from "@/lib/actions/customers.action";
import { Button } from "../ui/button";
import { ClearDebtDialog } from "./clearAlldebt";
import { getSession } from "@/lib/get-session";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    cashBack: string;
    totalCredit: string;
    totalDebits: string | number;
    totalSpent: string;
    previousDebits: string;
    totalJobs: string;
    role: string;
    phoneNumber: string;
  };
};
export async function ProfileStats({ user }: Props) {
  const allUser = await allCustomers();
  const session = await getSession();
  const adminUser = session?.user;

  const getTotalSpent = allUser.map((totalspent) =>
    Number(totalspent.totalSpent),
  );

  const getTotalQuantity = allUser.map((totalquantity) =>
    Number(totalquantity.totalJobs),
  );
  const totalQuantityOfAllUser = getTotalQuantity.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  const totalSpentOfAllUser = getTotalSpent.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  const reputation =
    ((Number(user?.totalSpent) / totalSpentOfAllUser) * 0.9 +
      (Number(user?.totalJobs) / totalQuantityOfAllUser) * 0.1) *
    100;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl  bg-white p-6 shadow-sm dark:bg-slate-900">
        <p className="text-sm text-slate-500">CashBack</p>
        <div className="flex justify-between align-baseline">
          <h3 className="mt-2 text-3xl font-bold text-green-500">
            ₦{Number(user.cashBack)?.toLocaleString()}
          </h3>
          <Button
            // variant={"secondary"}
            size={"xs"}
            className={`mt-2 ${adminUser?.role !== "admin" && "hidden"}`}
          >
            Clear cash
          </Button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <p className="text-sm text-slate-500">Total in Debit</p>
        <div className="flex justify-between align-baseline">
          <h3 className="mt-2 text-3xl font-bold text-red-500">
            ₦{Number(user.totalDebits).toLocaleString()}
          </h3>
          {adminUser?.role === "admin" && (
            <ClearDebtDialog user={user} triggerLabel="Clear Debt" />
          )}
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <p className="text-sm text-slate-500">Available funds</p>
        <div className="flex justify-between align-baseline">
          <h3 className="mt-2 text-3xl font-bold text-green-500">
            ₦{user.totalCredit.toLocaleString()}
          </h3>
          {adminUser?.role === "admin" && (
            <ClearDebtDialog user={user} triggerLabel="+Add Money" />
          )}
          {/* <Button
            // variant={"secondary"}
            size={"xs"}
            className={`mt-2 ${adminUser?.role !== "admin" && "hidden"}`}
          >
            +Add Money
          </Button> */}
        </div>
      </div>
      {user?.previousDebits > "1" ? (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">Previous Debits</p>
          <h3 className="mt-2 text-3xl font-bold text-red-500">
            ₦{Number(user.previousDebits).toLocaleString()}
          </h3>
          <p className="text-xs text-slate-500">Before registration</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">Reputation</p>
          <h3 className="mt-2 text-3xl font-bold text-orange-500">
            {isNaN(reputation) ? "0" : reputation.toFixed(2)}%
          </h3>
        </div>
      )}
    </div>
  );
}
