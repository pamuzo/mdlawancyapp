"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { createDebt, deleteBooking } from "@/lib/actions/booking.action";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

type customerBookings = {
  id: string;
  userId: string;
  jobType: string;
  status: string;
  quantity: number;
  totalPrice: number;
  deposit: number;
  balance: number;
  createdAt: string;
  deliveryDate: string;
  paymentMethod: string;
};

type customer = {
  id: string;
  name: string;
};

const ITEMS_PER_PAGE = 10;
export default function UserBooking({
  customerBookings,
  customer,
}: {
  customerBookings: customerBookings[];
  customer: customer;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<customerBookings | null>(null);

  const [state, formAction, pending] = useActionState(createDebt, {
    success: false,
    message: "",
    timestamp: 0,
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (state.timestamp === 0) return;

    if (state.success) {
      toast.success("Debt cleared successfully");
      setAmount(0);
      setPaymentMethod("");
      setSelectedBooking(null);
      setSheetOpen(false);
      setTimeout(() => {
        router.refresh();
      }, 200);
    } else {
      toast.error(state.message || "Failed to clear debt");
    }
  }, [state, router]);

  const filteredBookings = useMemo(() => {
    return customerBookings.filter((booking) => {
      const matchesSearch =
        booking.jobType.toLowerCase().includes(search.toLowerCase()) ||
        booking.id.toLowerCase().includes(search.toLowerCase());

      let matchesFilter = true;

      switch (filter) {
        case "PAID":
          matchesFilter = booking.balance <= 0;
          break;

        case "OUTSTANDING":
          matchesFilter = booking.balance > 0;
          break;

        case "PENDING":
        case "IN_PROGRESS":
        case "COMPLETED":
        case "CANCELLED":
          matchesFilter = booking.status === filter;
          break;

        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [customerBookings, search, filter]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getPageNumbers = () => {
    const delta = 1; // how many pages around current

    const range: (number | "...")[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }

    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    return range;
  };

  const handleDeleteBooking = async (booking: customerBookings) => {
    const formData = new FormData();

    formData.append("bookingId", booking.id);
    // formData.append("userId", customer.id);
    // formData.append("userId", booking.userId);
    formData.append("balance", booking.balance.toString());
    formData.append("totalPrice", booking.totalPrice.toString());

    const result = await deleteBooking(undefined, formData);

    if (result.success) {
      toast.success("Booking deleted successfully");
    } else {
      toast.error("Failed to delete booking");
    }
    router.refresh();
    console.log(result);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const textColor = ["text-red-600", "text-yellow-600", "text-green-600"];
  const isInvalidAmount =
    amount <= 0 || amount > (selectedBooking?.balance ?? 0);
  const isInvalidPaymentMethod = paymentMethod === "";

  return (
    <div
      className={`space-y-6  ${pathname === "/userbooking" && "mx-auto max-w-7xl"}`}
    >
      <Card>
        <CardHeader>
          <CardTitle>Search {customer.name} booking</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-6 md:flex-row">
          <Input
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-sm"
          />

          <Select
            value={filter}
            onValueChange={(value: string | null) => setFilter(value ?? "ALL")}
          >
            <SelectTrigger className="md:w-[200px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Bookings</SelectItem>

              {/* Status filters */}
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>

              {/* Balance filters */}
              <SelectItem value="PAID">Paid (Balance = 0)</SelectItem>
              <SelectItem value="OUTSTANDING">Outstanding Balance</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="my-4">
        <CardHeader>
          <CardTitle>All Bookings for {customer.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SN</TableHead>
                  <TableHead>Job Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead
                    className={`text-right ${pathname === "/userbooking" && "hidden"}`}
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedBookings.map((booking, index) => (
                  <TableRow key={booking.id ?? index}>
                    <TableCell
                      className={`font-medium ${textColor[Level(booking)]}`}
                    >
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/${pathname === "/userbooking" ? "userbooking" : "bookings"}/${booking.id}`}
                      >
                        {booking.jobType}
                      </Link>
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={booking.status} />
                    </TableCell>

                    <TableCell>{booking.quantity}</TableCell>

                    <TableCell className={`${textColor[Level(booking)]}`}>
                      ₦{booking.totalPrice.toLocaleString()}
                    </TableCell>

                    <TableCell className={`${textColor[Level(booking)]}`}>
                      ₦{booking?.deposit?.toLocaleString()}
                    </TableCell>

                    <TableCell className={`${textColor[Level(booking)]}`}>
                      ₦{booking.balance.toLocaleString()}
                    </TableCell>

                    <TableCell>
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{booking.paymentMethod}</TableCell>

                    <TableCell
                      className={`text-right ${pathname === "/userbooking" && "hidden"}`}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link
                              href={`/${pathname === "/userbooking" ? "userbooking" : "bookings"}/${booking.id}`}
                            >
                              View Details
                            </Link>
                          </DropdownMenuItem>

                          {/* to clear the debt */}
                          {booking.balance > 0 && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBooking(booking);
                                setAmount(booking.balance);
                                setPaymentMethod("");
                                setSheetOpen(true);
                              }}
                            >
                              Clear Debt
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>Completed</DropdownMenuItem>
                          <DropdownMenuItem>Cancel</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteBooking(booking)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((p) => Math.max(1, p - 1));
                      }}
                    />
                  </PaginationItem>

                  {/* First page */}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {/* Left ellipsis + middle pages */}
                  {getPageNumbers().map((page, i) =>
                    page === "..." ? (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  {/* Last page */}
                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === totalPages}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(totalPages);
                        }}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((p) => Math.min(totalPages, p + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>

        {/* Clear Debt Sheet */}
        <Sheet
          open={sheetOpen}
          onOpenChange={(open) => {
            console.log("Sheet:", open);
            setSheetOpen(open);

            if (!open) {
              setSelectedBooking(null);
              setPaymentMethod("");
              setAmount(0);
            }
          }}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Clear Debt</SheetTitle>
              <SheetDescription>
                This action will clear the selected customer's debt.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <form action={formAction} className="space-y-6 pt-5">
                <Label>Payment Amount (₦)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  max={selectedBooking?.balance}
                  min={1}
                  required
                />
                {/* error if amount is greater than balance */}
                {isInvalidAmount && (
                  <p className="text-sm text-red-500">
                    Payment amount cannot be greater than the outstanding
                    balance.
                  </p>
                )}

                <input
                  type="hidden"
                  name="bookingId"
                  value={selectedBooking?.id ?? ""}
                />
                <input type="hidden" name="userId" value={customer?.id ?? ""} />
                <div>
                  <Label>Balance (₦)</Label>
                  <Input
                    id="balance"
                    name="balance"
                    type="number"
                    value={selectedBooking?.balance ?? 0}
                    disabled
                  />
                </div>
                <div>
                  <Label>Payment Method</Label>

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
                      <SelectItem value="CREDIT">Credit</SelectItem>
                      <SelectItem value="CASHBACK">Cashback</SelectItem>
                    </SelectContent>
                  </Select>

                  <input
                    type="hidden"
                    name="paymentMethod"
                    value={paymentMethod}
                  />
                  {isInvalidPaymentMethod && (
                    <p className="text-sm text-red-500">
                      Payment Method is required.
                    </p>
                  )}
                </div>
                <SheetFooter>
                  <Button type="submit" disabled={pending || isInvalidAmount}>
                    {pending ? "Saving..." : "Save changes"}
                  </Button>
                  <SheetClose>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </div>

            {/* {state.message && (
              <div
                className={`rounded-md p-3 text-sm  ${
                  state.success
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {state.message}
              </div>
            )} */}
          </SheetContent>
        </Sheet>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    PENDING:
      "bg-yellow-100  text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    IN_PROGRESS:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <Badge className={variants[status] ?? "bg-muted text-muted-foreground"}>
      {status}
    </Badge>
  );
}

function Level(booking: customerBookings) {
  return booking.balance > 1 ? 0 : 2;
}
