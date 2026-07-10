"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { createBooking } from "@/lib/actions/booking.action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserAutocomplete } from "@/components/user-autocomplete";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface SubmitButtonProps {
  customer: unknown;
}

function SubmitButton({ customer }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={!customer}>
      {pending ? "Booking..." : "Create Booking"}
    </Button>
  );
}

export default function NewBookingPage() {
  const [data, action] = useActionState(createBooking, {
    success: false,
    message: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [customer, setCustomer] = useState<any>(null);

  // const [userId, setJobType] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobDetails, setJobDetails] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState("");
  const [deposit, setDeposit] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [deliveryDate, setDeliveryDate] = useState("");

  const totalPrice = useMemo(
    () => quantity * (parseFloat(cost) || 0),
    [quantity, cost],
  );

  const balance = useMemo(
    () => totalPrice - (parseFloat(deposit) || 0),
    [totalPrice, deposit],
  );
  const overpaid = balance < 0;

  useEffect(() => {
    if (data?.success) {
      toast.success("Booked  successfully!", {
        duration: 5000,
        // description: "Monday, January 3rd at 6:00pm",
      });

      formRef.current?.reset();

      setCustomer(null);
      setJobType("");
      setJobDetails("");
      setQuantity(1);
      setCost("");
      setDeposit("");
      setPaymentMethod("");
      setDeliveryDate("");
      // redirect("/");
    }

    if (data?.success === false && data?.message) {
      toast.error(data.message);
    }
  }, [data.timestamp]);

  // const resMessage = setTimeout(() => {
  //   <div
  //     className={`rounded-md p-3 text-sm ${
  //       data.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  //     }`}
  //   >
  //     {data.message}
  //   </div>;
  // }, 3000);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Booking</CardTitle>
        </CardHeader>

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

          <form action={action} className="space-y-6 pt-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Job Type</Label>

                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the job type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="EMBROIDERY">Embroidery </SelectItem>

                    <SelectItem value="HEATTRANSFER">Heat Transfer</SelectItem>

                    <SelectItem value="SCREENPRINTING">
                      Screen Printing
                    </SelectItem>
                    <SelectItem value="STONEING">Stoneing </SelectItem>
                    <SelectItem value="CUSTOMIZING">Customizing</SelectItem>
                    <SelectItem value="CUTTING">Cutting</SelectItem>
                    <SelectItem value="COLORPRINTING">
                      Color Printing
                    </SelectItem>
                    <SelectItem value="TRANING">Traning</SelectItem>
                    <SelectItem value="GRAPHICS">Graphics</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" required name="jobType" value={jobType} />
                <input
                  type="hidden"
                  required
                  name="userId"
                  value={customer?.id ?? ""}
                />
              </div>

              <div>
                <Label>Payment Method</Label>

                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
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
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
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
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
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
                    ₦{deposit.toLocaleString()}
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
                    ₦{overpaid ? (deposit - totalPrice).toLocaleString() : 0}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3">
              <Button variant="outline" type="button">
                Cancel
              </Button>

              <SubmitButton customer={customer} />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {/* {data.message && (
            <div
              className={`rounded-md p-3 text-sm  ${
                data.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {data.message}
            </div>
          )} */}
        </CardFooter>
      </Card>
    </div>
  );
}
