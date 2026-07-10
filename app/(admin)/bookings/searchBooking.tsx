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
import { useEffect, useMemo, useState } from "react";
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
} from "@/components/ui/pagination";

type Booking = {
  id: string;
  jobType: string;
  status: string;
  quantity: number;
  totalPrice: number;
  deposit: number;
  balance: number;
  deliveryDate: string;
  paymentMethod: string;
};

const ITEMS_PER_PAGE = 10;
export default function SearchBooking({ bookings }: { bookings: Booking[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking: any) => {
      const matchesSearch =
        booking.jobType.toLowerCase().includes(search.toLowerCase()) ||
        booking.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "ALL" || booking.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, status]);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status]);

  return (
    <div className="space-y-6 ">
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6 md:flex-row">
          <Input
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:max-w-sm"
          />

          <Select
            value={status}
            onValueChange={(value) => setStatus(value ?? "ALL")}
          >
            <SelectTrigger className="md:w-[200px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
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
                  <TableHead>Delivery</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedBookings.map((booking, index) => (
                  <TableRow key={booking.id ?? index}>
                    <TableCell className="font-medium">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </TableCell>
                    <TableCell>{booking.jobType}</TableCell>

                    <TableCell>
                      <StatusBadge status={booking.status} />
                    </TableCell>

                    <TableCell>{booking.quantity}</TableCell>

                    <TableCell>
                      ₦{booking.totalPrice.toLocaleString()}
                    </TableCell>

                    <TableCell>₦{booking.deposit.toLocaleString()}</TableCell>

                    <TableCell>₦{booking.balance.toLocaleString()}</TableCell>

                    <TableCell>
                      {new Date(booking.deliveryDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{booking.paymentMethod}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>

                          <DropdownMenuItem>Edit Booking</DropdownMenuItem>

                          <DropdownMenuItem>Update Status</DropdownMenuItem>
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
