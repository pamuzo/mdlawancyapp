"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useActionState, useMemo, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserAutocomplete } from "@/components/user-autocomplete";

import { createBooking } from "@/lib/actions/booking.action";
import { Spinner } from "../ui/spinner";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

type Customer = {
  id: string;
  phoneNumber?: string | null;
  name?: string | null;
  email?: string | null;
  businessName?: string | null;
  timestamp?: string | null;
};

// interface SubmitButtonProps {
//   customer: Customer | null;
// }

function SubmitButton({ customer }: { customer: Customer | null }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={!customer}>
      {pending ? (
        <>
          <Spinner data-icon="inline-start" />
          Booking...
        </>
      ) : (
        "Create Booking"
      )}
    </Button>
  );
}

export default function AddBookingDialog() {
  type BookingActionState = {
    success: boolean;
    message: string;
    timestamp: string;
  };

  const initialState: BookingActionState = {
    success: false,
    message: "",
    timestamp: new Date().toISOString(),
  };

  const [data, action] = useActionState(
    async (prevState: BookingActionState, formData: FormData) => {
      const result = await createBooking(prevState, formData);
      return {
        ...result,
        timestamp: new Date().toISOString(),
      } as BookingActionState;
    },
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  // const [userId, setJobType] = useState("");
  const [open, setOpen] = useState(false);
  const [jobType, setJobType] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState("");
  const [deposit, setDeposit] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  // cost:number

  const depositAmount = useMemo(() => parseFloat(deposit) || 0, [deposit]);

  const totalPrice = useMemo(() => quantity * Number(cost), [quantity, cost]);

  const balance = useMemo(
    () => totalPrice - depositAmount,
    [totalPrice, depositAmount],
  );
  const overpaid = balance < 0;

  const today = new Date().toISOString().split("T")[0];

  const resetForm = () => {
    formRef.current?.reset();

    setCustomer(null);
    setJobType("");
    setJobDetails("");
    setQuantity(1);
    setCost("");
    setDeposit("");
    setPaymentMethod("");
    setDeliveryDate("");
  };

  useEffect(() => {
    if (data?.success) {
      toast.success("Booking successfully created!", {
        duration: 5000,
      });

      setOpen(false);
      resetForm();
    }

    if (data?.success === false && data?.message) {
      toast.error(data.message);
    }
  }, [data?.success, data?.message]);

  // Close the dialog after successful submission

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          resetForm();
        }
      }}
    >
      <DialogTrigger>
        <Button className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          New Booking
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-[600px]">
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle>Create Booking</DialogTitle>

          <DialogDescription>
            Add a new booking and payment information.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">
          <CardContent>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Select Customer</Label>
                    <UserAutocomplete
                      value={customer?.id}
                      onSelect={setCustomer}
                    />
                  </div>

                  <div>
                    <Label>Phone Number</Label>

                    <Input value={customer?.phoneNumber ?? ""} readOnly />
                  </div>
                </div>

                {customer && (
                  <div className="mt-4 rounded-md border p-3">
                    <p className="font-medium">{customer.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {customer.businessName}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <form ref={formRef} action={action} className="space-y-6 pt-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Job Type</Label>

                  <Select
                    value={jobType}
                    onValueChange={(value) => setJobType(value ?? "")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the job type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="EMBROIDERY">Embroidery </SelectItem>

                      <SelectItem value="HEATTRANSFER">
                        Heat Transfer
                      </SelectItem>

                      <SelectItem value="SCREENPRINTING">
                        Screen Printing
                      </SelectItem>
                      <SelectItem value="STONING">Stoning </SelectItem>
                      <SelectItem value="CUSTOMIZING">Customizing</SelectItem>
                      <SelectItem value="CUTTING">Cutting</SelectItem>
                      <SelectItem value="COLORPRINTING">
                        Color Printing
                      </SelectItem>
                      <SelectItem value="TRANING">Traning</SelectItem>
                      <SelectItem value="GRAPHICS">Graphics</SelectItem>
                      <SelectItem value="OTHERs">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    required
                    name="jobType"
                    value={jobType}
                  />
                  <input
                    type="hidden"
                    required
                    name="userId"
                    value={customer?.id ?? ""}
                  />
                </div>

                <div>
                  <Label>Payment Method</Label>

                  <Select
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value ?? "")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="CASH">Cash</SelectItem>

                      <SelectItem value="TRANSFER">Transfer</SelectItem>

                      <SelectItem value="POS">POS</SelectItem>
                      <SelectItem value="NOTSURE">Not Sure</SelectItem>
                      <SelectItem value="CREDIT">Credit</SelectItem>
                      <SelectItem value="CASHBACK">Cashback</SelectItem>
                    </SelectContent>
                  </Select>

                  <input
                    type="hidden"
                    name="paymentMethod"
                    value={paymentMethod}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name">Job Details </Label>
                <Textarea
                  id="jobDetails"
                  name="jobDetails"
                  value={jobDetails}
                  rows={5}
                  onChange={(e) => setJobDetails(e.target.value)}
                  autoComplete="jobDetails"
                  placeholder="Describe the job..."
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    step="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Quantity"
                    required
                  />
                </div>

                <div>
                  <Label>Cost (₦)</Label>
                  <Input
                    id="cost"
                    name="cost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Cost"
                    required
                  />
                </div>

                <div>
                  <Label>Deposit Paid (₦)</Label>
                  <Input
                    id="deposit"
                    name="deposit"
                    type="number"
                    min="0"
                    step="0.01"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    placeholder="Deposit"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Delivery Date</Label>
                <Input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  placeholder="Pickup date"
                  value={deliveryDate}
                  min={today}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  // required
                />
              </div>

              {/* Summary */}

              <Card className="bg-muted/50">
                <CardContent className="grid gap-4 pt-6 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Price</p>

                    <p className="text-2xl font-bold">
                      ₦{totalPrice.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Deposit</p>

                    <p className="text-2xl font-bold">
                      ₦{depositAmount.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>

                    <p className="text-2xl font-bold text-orange-500">
                      ₦{overpaid ? 0 : balance.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Overpaid</p>

                    <p className="text-2xl font-bold text-green-500">
                      ₦
                      {overpaid
                        ? (depositAmount - totalPrice).toLocaleString()
                        : 0}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    resetForm();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>

                <SubmitButton customer={customer} />
              </div>
            </form>
          </CardContent>
        </div>
      </DialogContent>
    </Dialog>
  );
}
