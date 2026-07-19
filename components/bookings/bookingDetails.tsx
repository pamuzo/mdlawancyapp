import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  DollarSign,
  Package,
  User,
  Wallet,
} from "lucide-react";

type Booking = {
  id: string;
  userId: string;
  jobType: string;
  jobDetails: string;
  status: string;
  quantity: number;
  cost: number | { toNumber(): number };
  deposit: number | { toNumber(): number };
  balance: number | { toNumber(): number };
  overpaid: number | { toNumber(): number };
  totalPrice: number | { toNumber(): number };
  paymentMethod: string;
  deliveryDate: Date;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
  };
};

const statusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500";

    case "IN_PROGRESS":
      return "bg-blue-500";

    case "CANCELLED":
      return "bg-red-500";

    case "PENDING":
    default:
      return "bg-yellow-500";
  }
};

export default function BookingDetails(bookingData: Booking[]) {
  const booking: Booking = bookingData[0];

  return (
    <div
      //   initial={{ opacity: 0, y: 25 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ duration: 0.5 }}
      className="mx-auto max-w-7xl space-y-6 p-6"
    >
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {booking.jobType}
          </h1>

          {/* <p className="text-muted-foreground">Job ID: {booking.id}</p> */}
        </div>

        <Badge
          className={`${statusColor(booking.status)} px-4 py-2 text-white`}
        >
          {booking.status}
        </Badge>
      </div>
      {/* Summary */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Total Price"
          value={`₦${booking.totalPrice}`}
          icon={<DollarSign className="h-6 w-6" />}
        />

        <InfoCard
          title="Deposit"
          value={`₦${booking.deposit}`}
          icon={<Wallet className="h-6 w-6" />}
        />

        <InfoCard
          title="Balance"
          value={`₦${booking.balance}`}
          icon={<CreditCard className="h-6 w-6" />}
        />

        <InfoCard
          title="Quantity"
          value={booking.quantity}
          icon={<Package className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <Row label="Job Type" value={booking.jobType} />

              <Separator />

              <Row label="Payment Method" value={booking.paymentMethod} />

              <Separator />

              <Row label="Production Cost" value={`₦${booking.cost}`} />

              <Separator />

              <Row label="Overpaid" value={`₦${booking.overpaid}`} />

              <Separator />

              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Job Description
                </p>

                <div className="rounded-lg border bg-muted/40 p-4 leading-7">
                  {booking.jobDetails}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right */}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <User className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="font-semibold">{booking.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.user.email}
                  </p>

                  {booking.user.phoneNumber && (
                    <p className="text-sm text-muted-foreground">
                      {booking.user.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <TimelineRow
                icon={<CalendarDays size={18} />}
                title="Created"
                value={new Date(booking.createdAt).toLocaleString()}
              />

              <TimelineRow
                icon={<ClipboardList size={18} />}
                title="Delivery Date"
                value={new Date(booking.deliveryDate).toLocaleDateString()}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}

function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <div>
      <Card className="transition-all duration-300 hover:shadow-xl">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <h2 className="mt-1 text-2xl font-bold">{value}</h2>
          </div>

          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            {icon}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface RowProps {
  label: string;
  value: React.ReactNode;
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-muted-foreground">{label}</span>

      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}

interface TimelineRowProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function TimelineRow({ icon, title, value }: TimelineRowProps) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div>
        <p className="font-medium">{title}</p>

        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
