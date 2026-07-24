import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";

export default async function CustomersPage() {
  const customer = await allCustomers();

  const getTotalSpent = customer.map((totalspent) =>
    Number(totalspent.totalSpent),
  );

  const getTotalQuantity = customer.map((totalquantity) =>
    Number(totalquantity.totalJobs),
  );
  const totalQuantityOfAllUser = getTotalQuantity.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  const totalSpentOfAllUser = getTotalSpent.reduce(
    (accumulator, current) => accumulator + current,
    0,
  );

  const sortedCustomers = [...customer].sort((a, b) => {
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

  return (
    <div>
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
                  <TableCell>{index + 1}</TableCell>
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
                    ).toFixed(0)}
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
                        {/* <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator /> */}
                        {/* <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem> */}
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
