"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allCustomers } from "@/lib/actions/customers.action";
import { MoreHorizontalIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      const customerData = await allCustomers();
      setCustomers(customerData);
    }

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer?.name?.toLowerCase()?.includes(search.toLowerCase()) ||
        customer.id.toLowerCase().includes(search.toLowerCase());

      let matchesFilter = true;

      switch (filter) {
        case "PAID":
          matchesFilter = customer.balance <= 0;
          break;

        case "DEBTORS":
          matchesFilter = customer.totalDebits > 0;
          break;

        case "VERIFIED":
          matchesFilter = customer.emailVerified === true;
          break;

        case "UNVERIFIED":
          matchesFilter = customer.emailVerified === false;
          break;

        case "PENDING":
        case "IN_PROGRESS":
        case "COMPLETED":
        case "CANCELLED":
          matchesFilter = customer.status === filter;
          break;

        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [customers, search, filter]);

  const totalSpentOfAllUser =
    filteredCustomers.reduce(
      (accumulator, current) => accumulator + Number(current.totalSpent),
      0,
    ) || 1;

  const totalQuantityOfAllUser =
    filteredCustomers.reduce(
      (accumulator, current) => accumulator + Number(current.totalJobs),
      0,
    ) || 1;

  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      const reputationA =
        ((Number(a?.totalSpent) / totalSpentOfAllUser) * 0.7 +
          (Number(a?.totalJobs) / totalQuantityOfAllUser) * 0.3) *
        100;
      const reputationB =
        ((Number(b?.totalSpent) / totalSpentOfAllUser) * 0.7 +
          (Number(b?.totalJobs) / totalQuantityOfAllUser) * 0.3) *
        100;
      return reputationB - reputationA;
    });
  }, [filteredCustomers, totalSpentOfAllUser, totalQuantityOfAllUser]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex  justify-between">
          <CardTitle>Search for Customer</CardTitle>
          <h2> Total Customers: {customers.length}</h2>
          <h2> Total Debtors: {customers.filter((c) => c.totalDebits > 0).length}</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-6 md:flex-row">
          <div className="relative  w-full max-w-xl">
            <Input
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" widpr-10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Select
            value={filter}
            onValueChange={(value: string | null) => setFilter(value ?? "ALL")}
          >
            <SelectTrigger className="md:w-[200px]">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Customers</SelectItem>
              {/* 
              <SelectItem value="PAID">Paid (Balance = 0)</SelectItem> */}
              <SelectItem value="DEBTORS">Debtors </SelectItem>
              <SelectItem value="VERIFIED">Verified </SelectItem>
              <SelectItem value="UNVERIFIED">Unverified </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>All Customers</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-5">SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Verify</TableHead>
                <TableHead>Reputation</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedCustomers.map((customer, index) => (
                <TableRow key={customer.id ?? index}>
                  <TableCell
                    className={`${customer.totalDebits > 0 && "text-red-600"}`}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <Link href={`/customers/${customer.id}`}>
                      {customer.name}
                    </Link>
                  </TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.role}</TableCell>
                  <TableCell>
                    {customer.emailVerified === true
                      ? "Verified"
                      : "Unverified"}
                  </TableCell>
                  <TableCell>
                    {(
                      ((Number(customer?.totalSpent) / totalSpentOfAllUser) *
                        0.7 +
                        (Number(customer?.totalJobs) / totalQuantityOfAllUser) *
                          0.3) *
                      100
                    ).toFixed(2)}
                    %
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/customers/${customer.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
