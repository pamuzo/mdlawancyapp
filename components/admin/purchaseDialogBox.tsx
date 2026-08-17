"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createPurchase } from "@/lib/actions/purchase.action";

export default function CreatePurchaseDialog() {
  const initialState = {
    success: false,
    message: "",
    timestamp: new Date().toISOString(),
  };

  const [state, formAction, isPending] = useActionState(
    createPurchase,
    initialState,
  );

  const [open, setOpen] = useState(false);

  // Close the dialog after successful submission
  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
  }, [state.timestamp]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          New Purchase
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Purchase</DialogTitle>

          <DialogDescription>
            Add a new purchase and payment information.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          {/* Item */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Item name</label>

            <Input name="itemName" placeholder="e.g. MacBook Pro M4" required />

            {state.errors?.itemName && (
              <p className="text-xs text-destructive">
                {state.errors.itemName[0]}
              </p>
            )}
          </div>

          {/* Seller */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Seller</label>

            <Input
              name="seller"
              placeholder="Supplier or seller name"
              required
            />

            {state.errors?.seller && (
              <p className="text-xs text-destructive">
                {state.errors.seller[0]}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Input
              name="description"
              placeholder="Short purchase description"
              required
            />

            {state.errors?.description && (
              <p className="text-xs text-destructive">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          {/* Quantity + Cost */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>

              <Input
                name="quantity"
                type="number"
                min="1"
                step="1"
                placeholder="1"
                required
              />

              {state.errors?.quantity && (
                <p className="text-xs text-destructive">
                  {state.errors.quantity[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Unit cost</label>

              <Input
                name="cost"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                required
              />

              {state.errors?.cost && (
                <p className="text-xs text-destructive">
                  {state.errors.cost[0]}
                </p>
              )}
            </div>
          </div>

          {/* Payment method */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment method</label>

            <Select name="paymentMethod" required>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>

            {state.errors?.paymentMethod && (
              <p className="text-xs text-destructive">
                {state.errors.paymentMethod[0]}
              </p>
            )}
          </div>

          {/* Deposit */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Deposit</label>

            <Input
              name="deposit"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />

            {state.errors?.deposit && (
              <p className="text-xs text-destructive">
                {state.errors.deposit[0]}
              </p>
            )}
          </div>

          {/* Server message */}
          {state.message && !state.success && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <p className="text-sm text-destructive">{state.message}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            size="lg"
          >
            {isPending ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Creating purchase...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Purchase
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
