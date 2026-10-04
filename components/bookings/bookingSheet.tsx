"use client";

import { motion } from "framer-motion";
import moment from "moment";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type Booking = {
  id: string;
  userId: string;
  jobType: string;
  jobDetails: string;
  status: string;
  quantity: number;
  totalPrice: number;
  deposit: number;
  balance: number;
  deliveryDate: string;
  createdAt: string;
  paymentMethod: string;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
  };
};

type BookingSheetProps = {
  selectedBooking: Booking | null;
  setSelectedBooking: (booking: Booking | null) => void;
};

export default function BookingSheet({
  selectedBooking,
  setSelectedBooking,
}: BookingSheetProps) {
  const paymentProgress =
    selectedBooking && selectedBooking.totalPrice > 0
      ? Math.min(
          Math.max(
            (selectedBooking.deposit / selectedBooking.totalPrice) * 100,
            0,
          ),
          100,
        )
      : 0;

  return (
    <Sheet
      open={Boolean(selectedBooking)}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedBooking(null);
        }
      }}
    >
      <SheetContent className="w-full overflow-y-auto p-4 sm:max-w-lg">
        {selectedBooking && (
          <>
            <SheetHeader>
              <SheetTitle>Booking Details</SheetTitle>
            </SheetHeader>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-6 space-y-6"
            >
              {/* Customer */}
              <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Package className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-semibold">
                      {selectedBooking.user.name}
                    </h2>

                    <p className="mt-1 break-words text-sm text-muted-foreground">
                      {selectedBooking.user.phoneNumber ||
                        selectedBooking.user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>

                <StatusBadge status={selectedBooking.status} />
              </div>

              {/* Financial overview */}
              <div className="grid grid-cols-2 gap-3">
                <DetailStat
                  label="Total Price"
                  value={`₦${selectedBooking.totalPrice.toLocaleString()}`}
                  icon={CircleDollarSign}
                />

                <DetailStat
                  label="Deposit"
                  value={`₦${selectedBooking.deposit.toLocaleString()}`}
                  icon={ArrowUpRight}
                  positive
                />

                <DetailStat
                  label="Balance"
                  value={`₦${selectedBooking.balance.toLocaleString()}`}
                  icon={ArrowDownRight}
                  warning={selectedBooking.balance > 0}
                />

                <DetailStat
                  label="Quantity"
                  value={selectedBooking.quantity.toLocaleString()}
                  icon={Package}
                />
              </div>

              <Separator />

              {/* Booking details */}
              <div className="space-y-4">
                <DetailRow label="Job Type" value={selectedBooking.jobType} />

                <DetailRow
                  label="Job Details"
                  value={selectedBooking.jobDetails}
                  multiline
                />

                <DetailRow
                  label="Payment Method"
                  value={selectedBooking.paymentMethod || "—"}
                />

                <DetailRow
                  label="Purchase Date"
                  value={moment(selectedBooking.createdAt).format("ll")}
                />

                <DetailRow
                  label="Delivery Date"
                  value={moment(selectedBooking.deliveryDate).format("ll")}
                />

                <DetailRow
                  label="Booking ID"
                  value={selectedBooking.id}
                  multiline
                />
              </div>

              {/* Payment progress */}
              <div className="rounded-2xl border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Payment Progress</p>

                  <p className="text-sm font-semibold">
                    {Math.round(paymentProgress)}%
                  </p>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${paymentProgress}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Paid ₦{selectedBooking.deposit.toLocaleString()}</span>

                  <span>
                    Remaining ₦{selectedBooking.balance.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1">Edit Booking</Button>

                <Button variant="outline">View Invoice</Button>
              </div>
            </motion.div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    PENDING:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",

    IN_PROGRESS:
      "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",

    COMPLETED:
      "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",

    CANCELLED:
      "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <Badge className={variants[status] ?? "bg-muted text-muted-foreground"}>
      {formatStatus(status)}
    </Badge>
  );
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function DetailStat({
  label,
  value,
  icon: Icon,
  positive,
  warning,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  positive?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2">
        <Icon
          className={`h-4 w-4 ${
            positive
              ? "text-emerald-600"
              : warning
                ? "text-orange-600"
                : "text-muted-foreground"
          }`}
        />

        <p className="text-xs text-muted-foreground">{label}</p>
      </div>

      <p
        className={`mt-2 font-semibold ${
          positive ? "text-emerald-600" : warning ? "text-orange-600" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>

      <span
        className={`text-right text-sm font-medium ${
          multiline ? "max-w-[240px] break-words" : "max-w-[220px] truncate"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}
