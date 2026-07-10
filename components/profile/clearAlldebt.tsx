"use client";

import { useActionState, useEffect, useState } from "react";
import { clearAllDebts } from "@/lib/actions/booking.action";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  totalDebits: number;
}

export function ClearDebtForm({ user }: { user: User }) {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    clearAllDebts,
    initialState,
  );
  const router = useRouter();
  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      setTimeout(() => {
        router.refresh();
      }, 200);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="bookingId" value={user.id} />
      <p>
        A total of{" "}
        <span className="font-bold text-red-500">₦{user.totalDebits}</span> in
        outstanding debts.
      </p>
      <p>Which must be paid in full.</p>

      <Label htmlFor="amount">Amount </Label>
      <Input name="amount" value={user.totalDebits} readOnly />

      <Label htmlFor="paymentMethod">Payment Method</Label>
      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
        <SelectTrigger>
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="CASH">Cash</SelectItem>

          <SelectItem value="TRANSFER">Transfer</SelectItem>

          <SelectItem value="POS">POS</SelectItem>
          <SelectItem value="CREDIT">Credit</SelectItem>
          <SelectItem value="CASHBACK">Cashback</SelectItem>
        </SelectContent>
      </Select>

      <input type="hidden" name="paymentMethod" value={paymentMethod} />
      {state.message && (
        <p className={state.success ? "text-green-500" : "text-red-500"}>
          {state.message}
        </p>
      )}

      <Button disabled={pending} type={"submit"}>
        {pending ? "Saving..." : "Clear Debt"}
      </Button>
    </form>
  );
}
