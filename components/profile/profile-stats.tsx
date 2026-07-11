import { allCustomers } from "@/lib/actions/customers.action";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ClearDebtForm } from "./clearAlldebt";
import { getSession } from "@/lib/get-session";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    cashBack: string;
    totalCredit: string;
    totalDebits: string;
    totalSpent: string;
    totalJobs: string;
    role: string;
    phoneNumber: string;
  };
};
export async function ProfileStats({ user }: Props) {
  const allUser = await allCustomers();
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

  const session = await getSession();
  const adminUser = session?.user;

  const reputation =
    ((Number(user?.totalSpent) / totalSpentOfAllUser) * 0.7 +
      (Number(user?.totalJobs) / totalQuantityOfAllUser) * 0.3) *
    100;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl  bg-white p-6 shadow-sm dark:bg-slate-900">
        <p className="text-sm text-slate-500">CashBack</p>
        <div className="flex justify-between align-baseline">
          <h3 className="mt-2 text-3xl font-bold text-green-500">
            ₦{user.cashBack.toLocaleString()}
          </h3>
          <Button
            variant={"secondary"}
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
          <Dialog>
            <DialogTrigger
              className={`mt-3 ${adminUser?.role !== "admin" && "hidden"}`}
            >
              Clear Debt
            </DialogTrigger>
            <DialogContent>
              <ClearDebtForm
                user={{ ...user, totalDebits: Number(user.totalDebits) }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <p className="text-sm text-slate-500">Total in Credit</p>
        <div className="flex justify-between align-baseline">
          <h3 className="mt-2 text-3xl font-bold text-green-500">
            ₦{user.totalCredit.toLocaleString()}
          </h3>
          <Button
            variant={"secondary"}
            size={"xs"}
            className={`mt-2 ${adminUser?.role !== "admin" && "hidden"}`}
          >
            Clear Credit
          </Button>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <p className="text-sm text-slate-500">Reputation</p>
        <h3 className="mt-2 text-3xl font-bold text-orange-500">
          {isNaN(reputation) ? "0" : reputation.toFixed(0)}%
        </h3>
      </div>
    </div>
  );
}
