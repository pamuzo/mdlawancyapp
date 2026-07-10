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
import { getLatestProducts } from "@/lib/actions/production.actions";
import { getSession } from "@/lib/get-session";
import { MoreHorizontalIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Products() {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/forbidden");
  if (user?.role !== "admin") {
    redirect("/forbidden");
  }

  const products = await getLatestProducts();

  const priceOfAllProduct = products
    .map((product) => product.price)
    .reduce((sum, totalPrice) => sum + Number(totalPrice), 0);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Mange All product and track inventory level</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>All Product</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-5">SN</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price </TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id ?? index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.stock ?? "-"}</TableCell>
                  <TableCell>{product.price ?? "-"}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell>{priceOfAllProduct.toFixed(0)}</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
