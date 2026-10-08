"use client";

import { useActionState, useCallback, useEffect, useState } from "react";

import { addMoney, clearAllDebts } from "@/lib/actions/debt.actions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const initialState = {
  success: false,
  message: "",
};

interface User {
  id: string;
  name: string;
  totalDebits: number | string;
}

export function ClearDebtForm({
  user,
  onSuccess,
  triggerLabel,
}: {
  user: User;
  onSuccess?: () => void;
  triggerLabel: string;
}) {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [amount, setAmount] = useState<number>("" as unknown as number);

  const action = triggerLabel === "+Add Money" ? addMoney : clearAllDebts;

  const [state, formAction, pending] = useActionState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      onSuccess?.();
      setTimeout(() => {
        router.refresh();
      }, 200);
    } else {
      toast.error(state.message);
    }
  }, [state, router, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="bookingId" value={user.id} />
      <p>
        {triggerLabel === "+Add Money" ? (
          `Add money to  ${user?.name}'s account.`
        ) : (
          <div>
            {"Clear " + user?.name + "'s debt."}
            <span className="font-bold text-red-600"> ₦{user.totalDebits}</span>
          </div>
        )}
      </p>

      <p>
        {triggerLabel === "+Add Money"
          ? "How much would you like to add?"
          : "Which must be paid in full.."}
      </p>

      <Label htmlFor="amount">Amount </Label>
      <Input
        name="amount"
        id="amount"
        type="number"
        min="1"
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="0.00"
        required
        value={triggerLabel === "+Add Money" ? amount : user.totalDebits}
        readOnly={triggerLabel !== "+Add Money"}
      />

      <Label htmlFor="paymentMethod">Payment Method</Label>
      <Select
        value={paymentMethod}
        onValueChange={(val) => setPaymentMethod(val ?? "")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="CASH">Cash</SelectItem>

          <SelectItem value="TRANSFER">Transfer</SelectItem>

          <SelectItem value="POS">POS</SelectItem>

          <SelectItem
            value="CREDIT"
            className={triggerLabel === "+addMoney" ? "hidden" : ""}
          >
            Credit
          </SelectItem>
          <SelectItem
            value="CASHBACK"
            className={triggerLabel === "+addMoney" ? "hidden" : ""}
          >
            Cashback
          </SelectItem>
        </SelectContent>
      </Select>

      <input type="hidden" name="paymentMethod" value={paymentMethod} />
      {state.message && (
        <p className={state.success ? "text-green-500" : "text-red-500"}>
          {state.message}
        </p>
      )}

      <Button disabled={pending} type="submit">
        {pending
          ? "Saving..."
          : triggerLabel === "+Add Money"
            ? "Add Money"
            : "Clear Debt"}
      </Button>
    </form>
  );
}

export function ClearDebtDialog({
  user,
  triggerLabel,
}: {
  user: User;
  triggerLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const closeOnSuccess = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-3">{triggerLabel}</DialogTrigger>
      <DialogContent>
        <ClearDebtForm
          user={user}
          onSuccess={closeOnSuccess}
          triggerLabel={triggerLabel}
        />
      </DialogContent>
    </Dialog>
  );
}
