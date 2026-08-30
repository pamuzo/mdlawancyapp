"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChartNoAxesCombined,
  CircleDollarSignIcon,
  GoalIcon,
  Loader2,
  MoreHorizontal,
  NotebookPen,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  cancelBooking,
  CompleteStatus,
  deleteBooking,
} from "@/lib/actions/booking.action";
import StatCard from "@/components/stateCard";
import AddBookingDialog from "@/components/admin/addBookingDialogBox";

type Booking = {
  id: string;
  userId: string;
  jobType: string;
  status: string;
  quantity: number;
  totalPrice: number;
  deposit: number;
  balance: number;
  deliveryDate: string;
  paymentMethod: string;
  user: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
  };
};

type FilterType =
  | "ALL"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "PAID"
  | "OUTSTANDING";

const ITEMS_PER_PAGE = 15;

export default function SearchBooking({ bookings }: { bookings: Booking[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [completingBookingId, setCompletingBookingId] = useState<string | null>(
    null,
  );

  const router = useRouter();

  //  Filter bookings by search term and selected filter.
  const filteredBookings = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        !searchTerm ||
        booking.jobType?.toLowerCase().includes(searchTerm) ||
        booking.id?.toLowerCase().includes(searchTerm) ||
        booking.user?.name?.toLowerCase().includes(searchTerm) ||
        booking.user?.email?.toLowerCase().includes(searchTerm) ||
        booking.user?.phoneNumber?.toLowerCase().includes(searchTerm);

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

        case "ALL":
        default:
          matchesFilter = true;
          break;
      }

      return matchesSearch && matchesFilter;
    });
  }, [bookings, search, filter]);

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const paginatedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return filteredBookings.slice(startIndex, endIndex);
  }, [filteredBookings, currentPage]);

  const handleCompleteBooking = async (bookingId: string) => {
    setCompletingBookingId(bookingId);

    try {
      const result = await CompleteStatus(bookingId);

      if (result?.success) {
        toast.success("Booking completed successfully");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to complete booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setCompletingBookingId(null);
    }
  };

  /**
   * Reset pagination whenever the search/filter changes.
   * This prevents the user from being left on an empty page
   * after applying a new filter.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  /**
   * Keep current page valid if bookings are deleted or filtered.
   */
  useEffect(() => {
    if (totalPages === 0) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /**
   * Delete booking.
   */
  const handleDeleteBooking = async (booking: Booking) => {
    if (processingId) return;

    try {
      setProcessingId(booking.id);

      const formData = new FormData();

      formData.append("bookingId", booking.id);
      formData.append("userId", booking.userId);
      formData.append("balance", booking.balance.toString());
      formData.append("totalPrice", booking.totalPrice.toString());
      formData.append("quantity", booking.quantity.toString());

      const result = await deleteBooking(undefined, formData);

      if (result.success) {
        toast.success("Booking deleted successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Delete booking error:", error);
      toast.error("Something went wrong while deleting the booking");
    } finally {
      setProcessingId(null);
    }
  };

  /**
   * Cancel booking.
   */
  const handleCancelBooking = async (booking: Booking) => {
    if (processingId) return;

    try {
      setProcessingId(booking.id);

      const formData = new FormData();

      formData.append("bookingId", booking.id);
      formData.append("userId", booking.userId);
      formData.append("balance", booking.balance.toString());
      formData.append("totalPrice", booking.totalPrice.toString());
      formData.append("quantity", booking.quantity.toString());

      const result = await cancelBooking(undefined, formData);

      if (result.success) {
        toast.success("Booking canceled successfully");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error("Something went wrong while canceling the booking");
    } finally {
      setProcessingId(null);
    }
  };

  /**
   * Generate pagination numbers.
   */
  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 1) {
      return [];
    }

    const delta = 1;
    const pages: (number | "...")[] = [];

    const startPage = Math.max(2, currentPage - delta);
    const endPage = Math.min(totalPages - 1, currentPage + delta);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    return pages;
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  };
  const totalRevenue = filteredBookings.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );

  const pendingBookings = filteredBookings.filter(
    (b) => b.status === "PENDING",
  ).length;

  const completedBookings = filteredBookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Bookings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track bookings, payments, customers and outstanding balances.
          </p>
        </div>
        <AddBookingDialog />
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total bookings"
          value={`${filteredBookings.length.toLocaleString()}`}
          icon={NotebookPen}
          description="Total bookings"
          color="bg-primary/10 text-green-600"
        />

        <StatCard
          title="Total Revenue"
          value={`₦${totalRevenue.toLocaleString()}`}
          icon={CircleDollarSignIcon}
          description="Total revenue"
          color="bg-primary/10 text-primary"
        />

        <StatCard
          title="Total Pending"
          value={`${pendingBookings.toLocaleString()}`}
          icon={ChartNoAxesCombined}
          description="Total pending bookings"
          color="bg-primary/10 text-orange-600"
        />
        <StatCard
          title="Total Completed"
          value={`${completedBookings.toLocaleString()}`}
          icon={GoalIcon}
          description="Total completed bookings"
          color="bg-violet-500/10 text-violet-600"
        />
      </div>
      {/* Search and Filters */}

      <Card>
        <CardHeader className="border-b bg-background/70 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-lg">Recent Bookkings</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredBookings.length} booking
                {filteredBookings.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative w-full max-w-xl">
                <Input
                  placeholder="Search by job type, booking ID, customer, email or phone..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="pr-10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <Select
                value={filter}
                onValueChange={(value) => setFilter(value as FilterType)}
              >
                <SelectTrigger className="w-full md:w-[220px]">
                  <SelectValue placeholder="Filter bookings" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Bookings</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="PAID">Paid (Balance = ₦0)</SelectItem>
                  <SelectItem value="OUTSTANDING">
                    Outstanding Balance
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SN</TableHead>
                  <TableHead>Job Type</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedBookings.length > 0 ? (
                  paginatedBookings.map((booking, index) => {
                    const isProcessing = processingId === booking.id;

                    const isClosed = ["CANCELLED", "COMPLETED"].includes(
                      booking.status,
                    );

                    return (
                      <TableRow key={booking.id}>
                        {/* Serial Number */}
                        <TableCell className="font-medium">
                          {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </TableCell>

                        {/* Job Type */}
                        <TableCell>
                          <Link
                            href={`/bookings/${booking.id}`}
                            className="font-medium hover:underline"
                          >
                            {booking.jobType}
                          </Link>
                        </TableCell>

                        {/* Customer */}
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {booking.user?.name || "Unknown Customer"}
                            </span>

                            {booking.user?.email && (
                              <span className="text-xs text-muted-foreground">
                                {booking.user.email}
                              </span>
                            )}
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          {completingBookingId === booking.id ? (
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                              Processing...
                            </Badge>
                          ) : (
                            <StatusBadge status={booking.status} />
                          )}
                        </TableCell>

                        {/* Quantity */}
                        <TableCell>
                          {booking.quantity.toLocaleString()}
                        </TableCell>

                        {/* Total */}
                        <TableCell>
                          ₦{booking.totalPrice.toLocaleString()}
                        </TableCell>

                        {/* Deposit */}
                        <TableCell>
                          ₦{booking.deposit.toLocaleString()}
                        </TableCell>

                        {/* Balance */}
                        <TableCell
                          className={
                            booking.balance > 0
                              ? "font-medium text-red-600"
                              : "font-medium text-green-600"
                          }
                        >
                          ₦{booking.balance.toLocaleString()}
                        </TableCell>

                        {/* Payment Method */}
                        <TableCell>{booking.paymentMethod || "—"}</TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                                disabled={isProcessing}
                                aria-label={`Actions for ${booking.jobType}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-44">
                              {/* View */}
                              <DropdownMenuItem>
                                <Link
                                  href={`/bookings/${booking.id}`}
                                  className="w-full cursor-pointer"
                                >
                                  View Details
                                </Link>
                              </DropdownMenuItem>

                              {/* Edit */}
                              {!isClosed && (
                                <DropdownMenuItem>
                                  <Link
                                    href={`/bookings/${booking.id}/edit`}
                                    className="w-full cursor-pointer"
                                  >
                                    Edit Booking
                                  </Link>
                                </DropdownMenuItem>
                              )}

                              {/* Complete */}

                              <DropdownMenuItem
                                className={
                                  ["CANCELLED", "COMPLETED"].includes(
                                    booking.status,
                                  )
                                    ? "hidden"
                                    : ""
                                }
                                disabled={completingBookingId === booking.id}
                                onClick={() =>
                                  handleCompleteBooking(booking.id)
                                }
                              >
                                Mark Completed
                              </DropdownMenuItem>

                              {/* Cancel */}
                              {!isClosed && (
                                <DropdownMenuItem
                                  disabled={isProcessing}
                                  onSelect={(event) => {
                                    event.preventDefault();
                                    void handleCancelBooking(booking);
                                  }}
                                  className="text-orange-600 focus:text-orange-600"
                                >
                                  Cancel Booking
                                </DropdownMenuItem>
                              )}

                              {/* Delete */}
                              {!isClosed && (
                                <DropdownMenuItem
                                  disabled={isProcessing}
                                  onSelect={(event) => {
                                    event.preventDefault();
                                    void handleDeleteBooking(booking);
                                  }}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  Delete Booking
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p className="font-medium">No bookings found</p>

                        {(search || filter !== "ALL") && (
                          <p className="text-sm text-muted-foreground">
                            Try changing your search or filter.
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-6">
                <PaginationContent>
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                      onClick={(event) => {
                        event.preventDefault();

                        if (currentPage > 1) {
                          goToPage(currentPage - 1);
                        }
                      }}
                    />
                  </PaginationItem>

                  {/* First Page */}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === 1}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>

                  {/* Middle Pages */}
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === page}
                          onClick={(event) => {
                            event.preventDefault();
                            goToPage(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  {/* Last Page */}
                  {totalPages > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === totalPages}
                        onClick={(event) => {
                          event.preventDefault();
                          goToPage(totalPages);
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
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                      onClick={(event) => {
                        event.preventDefault();

                        if (currentPage < totalPages) {
                          goToPage(currentPage + 1);
                        }
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Booking status badge.
 */
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

/**
 * Convert values such as IN_PROGRESS into
 * human-readable labels.
 */
function formatStatus(status: string) {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
