"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import CreatePurchaseDialog from "@/components/admin/purchaseDialogBox";
import StatCard from "@/components/stateCard";
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleDollarSign,
  Ellipsis,
  Package,
  Search,
  Wallet,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

type Purchase = {
  id: string;
  itemName: string;
  seller: string;
  description: string;
  quantity: number;
  cost: number;
  deposit: number;
  balance: number;
  paymentMethod: string;
  totalPrice: number;
  createdAt: string;
};

type Props = {
  purchases: Purchase[];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

function PaymentBadge({ method }: { method: string }) {
  const styles: Record<string, string> = {
    Card: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Cash: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    "Bank Transfer": "bg-violet-500/10 text-violet-600 border-violet-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-1 font-medium ${styles[method] ?? ""}`}
    >
      {method}
    </Badge>
  );
}

export default function PurchasesClientPage({ purchases }: Props) {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 15;

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.itemName.toLowerCase().includes(search.toLowerCase()) ||
      purchase.seller.toLowerCase().includes(search.toLowerCase());

    const matchesPayment =
      paymentFilter === "all" || purchase.paymentMethod === paymentFilter;

    return matchesSearch && matchesPayment;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPurchases.length / ITEMS_PER_PAGE),
  );

  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem =
    filteredPurchases.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredPurchases.length,
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  const totalPurchases = purchases.reduce(
    (sum, purchase) => sum + purchase.totalPrice,
    0,
  );

  const totalDeposits = purchases.reduce(
    (sum, purchase) => sum + purchase.deposit,
    0,
  );

  const totalBalance = purchases.reduce(
    (sum, purchase) => sum + purchase.balance,
    0,
  );

  const totalItems = purchases.reduce(
    (sum, purchase) => sum + purchase.quantity,
    0,
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, paymentFilter]);

  return (
    <div className="min-h-screen ">
      <div className="flex min-h-screen">
        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
            {/* Page heading */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Purchases
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Track purchases, payments, suppliers and outstanding balances.
                </p>
              </div>

              <CreatePurchaseDialog />
            </motion.div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Purchases"
                value={formatCurrency(totalPurchases)}
                icon={CircleDollarSign}
                trend="+12.5%"
                description="vs last month"
                color="bg-primary/10 text-primary"
              />

              <StatCard
                title="Total Deposits"
                value={formatCurrency(totalDeposits)}
                icon={Banknote}
                trend="+8.2%"
                description="paid upfront"
                color="bg-emerald-500/10 text-emerald-600"
              />

              <StatCard
                title="Outstanding"
                value={formatCurrency(totalBalance)}
                icon={Wallet}
                description="remaining balance"
                color="bg-orange-500/10 text-orange-600"
              />

              <StatCard
                title="Items Purchased"
                value={totalItems.toLocaleString()}
                icon={Package}
                trend="+5.4%"
                description="total quantity"
                color="bg-violet-500/10 text-violet-600"
              />
            </div>

            {/* Purchases section */}
            <Card className="mt-6 overflow-hidden border-border/60 shadow-sm">
              <CardHeader className="border-b bg-background/70 px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <CardTitle className="text-lg">Recent Purchases</CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {filteredPurchases.length} purchase
                      {filteredPurchases.length !== 1 ? "s" : ""} found
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        placeholder="Search purchases..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full pl-9 sm:w-[240px]"
                      />

                      {search && (
                        <button
                          onClick={() => setSearch("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <Select
                      value={paymentFilter}
                      onValueChange={(value) => {
                        setPaymentFilter(value);
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-full sm:w-[160px]">
                        <SelectValue placeholder="Payment method" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="all">All methods</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Bank Transfer">
                          Bank Transfer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="pl-6">Purchase</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Deposit</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="pr-6" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    <AnimatePresence mode="popLayout">
                      {paginatedPurchases.map((purchase, index) => (
                        <motion.tr
                          key={purchase.id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                          }}
                          transition={{
                            delay: index * 0.04,
                          }}
                          className="group cursor-pointer"
                          onClick={() => setSelectedPurchase(purchase)}
                        >
                          <TableCell className="pl-6">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Package className="h-4 w-4" />
                              </div>

                              <div className="min-w-0">
                                <p className="font-medium">
                                  {purchase.itemName}
                                </p>
                                <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                                  {purchase.description}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="font-medium">
                            {purchase.seller}
                          </TableCell>

                          <TableCell>{purchase.quantity}</TableCell>

                          <TableCell className="font-semibold">
                            {formatCurrency(purchase.totalPrice)}
                          </TableCell>

                          <TableCell className="text-emerald-600">
                            {formatCurrency(purchase.deposit)}
                          </TableCell>

                          <TableCell className="font-medium text-orange-600">
                            {formatCurrency(purchase.balance)}
                          </TableCell>

                          <TableCell>
                            <PaymentBadge method={purchase.paymentMethod} />
                          </TableCell>

                          <TableCell className="text-muted-foreground">
                            {formatDate(purchase.createdAt)}
                          </TableCell>

                          <TableCell className="pr-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPurchase(purchase);
                              }}
                            >
                              <Ellipsis className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y md:hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  {paginatedPurchases.map((purchase, index) => (
                    <motion.button
                      key={purchase.id}
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 12,
                      }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => setSelectedPurchase(purchase)}
                      className="block w-full text-left"
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <Package className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold">
                                {purchase.itemName}
                              </p>

                              <p className="truncate text-xs text-muted-foreground">
                                {purchase.seller}
                              </p>
                            </div>
                          </div>

                          <PaymentBadge method={purchase.paymentMethod} />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-[11px] text-muted-foreground">
                              Total
                            </p>
                            <p className="mt-1 text-sm font-semibold">
                              {formatCurrency(purchase.totalPrice)}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] text-muted-foreground">
                              Deposit
                            </p>
                            <p className="mt-1 text-sm font-semibold text-emerald-600">
                              {formatCurrency(purchase.deposit)}
                            </p>
                          </div>

                          <div>
                            <p className="text-[11px] text-muted-foreground">
                              Balance
                            </p>
                            <p className="mt-1 text-sm font-semibold text-orange-600">
                              {formatCurrency(purchase.balance)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                          <span>{purchase.quantity} items</span>

                          <span>{formatDate(purchase.createdAt)}</span>

                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {/* {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Loading purchases...
                  </p>
                </div>
              ) : */}

              {filteredPurchases.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <h3 className="mt-4 font-semibold">No purchases found</h3>

                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Try changing your search or payment method filter.
                  </p>
                </div>
              ) : null}

              {filteredPurchases.length > 0 && (
                <div className="border-t bg-muted/[0.15] px-4 py-4 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Results information */}
                    <motion.p
                      key={`${startItem}-${endItem}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-muted-foreground"
                    >
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {startItem}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-foreground">
                        {endItem}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-foreground">
                        {filteredPurchases.length}
                      </span>{" "}
                      purchases
                    </motion.p>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-1">
                      {/* First page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                        className="h-9 w-9 rounded-lg"
                        aria-label="First page"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>

                      {/* Previous */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="h-9 w-9 rounded-lg"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      {/* Page numbers */}
                      <div className="mx-1 flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, index) => {
                          const page = index + 1;
                          const isActive = currentPage === page;

                          return (
                            <motion.button
                              key={page}
                              type="button"
                              onClick={() => goToPage(page)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                                isActive
                                  ? "text-primary-foreground"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              aria-label={`Go to page ${page}`}
                              aria-current={isActive ? "page" : undefined}
                            >
                              {isActive && (
                                <motion.span
                                  layoutId="activePurchasePage"
                                  className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                  }}
                                />
                              )}

                              <span className="relative z-10">{page}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Next */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="h-9 w-9 rounded-lg"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>

                      {/* Last page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="h-9 w-9 rounded-lg"
                        aria-label="Last page"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      {/* Purchase details */}
      <Sheet
        open={!!selectedPurchase}
        onOpenChange={(open) => {
          if (!open) setSelectedPurchase(null);
        }}
      >
        <SheetContent className="w-full p-4 overflow-y-auto sm:max-w-lg">
          {selectedPurchase && (
            <>
              <SheetHeader>
                <SheetTitle>Purchase Details</SheetTitle>
              </SheetHeader>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-6 space-y-6"
              >
                {/* Hero */}
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Package className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold">
                        {selectedPurchase.itemName}
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {selectedPurchase.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial overview */}
                <div className="grid grid-cols-2 gap-3">
                  <DetailStat
                    label="Total Price"
                    value={formatCurrency(selectedPurchase.totalPrice)}
                    icon={CircleDollarSign}
                  />

                  <DetailStat
                    label="Deposit"
                    value={formatCurrency(selectedPurchase.deposit)}
                    icon={ArrowUpRight}
                    positive
                  />

                  <DetailStat
                    label="Balance"
                    value={formatCurrency(selectedPurchase.balance)}
                    icon={ArrowDownRight}
                    warning
                  />

                  <DetailStat
                    label="Quantity"
                    value={selectedPurchase.quantity.toString()}
                    icon={Package}
                  />
                </div>

                <Separator />

                {/* Details */}
                <div className="space-y-4">
                  <DetailRow label="Seller" value={selectedPurchase.seller} />

                  <DetailRow
                    label="Unit Cost"
                    value={formatCurrency(selectedPurchase.cost)}
                  />

                  <DetailRow
                    label="Payment Method"
                    value={selectedPurchase.paymentMethod}
                  />

                  <DetailRow
                    label="Purchase Date"
                    value={formatDate(selectedPurchase.createdAt)}
                  />

                  <DetailRow label="Purchase ID" value={selectedPurchase.id} />
                </div>

                {/* Balance progress */}
                <div className="rounded-2xl border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Payment Progress</p>

                    <p className="text-sm font-semibold">
                      {Math.round(
                        (selectedPurchase.deposit /
                          selectedPurchase.totalPrice) *
                          100,
                      )}
                      %
                    </p>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          (selectedPurchase.deposit /
                            selectedPurchase.totalPrice) *
                            100,
                          100,
                        )}%`,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>Paid {formatCurrency(selectedPurchase.deposit)}</span>

                    <span>
                      Remaining {formatCurrency(selectedPurchase.balance)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">Edit Purchase</Button>

                  <Button variant="outline">View Invoice</Button>
                </div>
              </motion.div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Mobile navigation */}
      {/* <Sheet open={mobileMenu} onOpenChange={setMobileMenu}>
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingCart className="h-4 w-4" />
              </div>
              ProcureX
            </SheetTitle>
          </SheetHeader>

          <nav className="mt-8 space-y-1">
            <NavItem icon={LayoutDashboard} label="Dashboard" />
            <NavItem icon={ShoppingCart} label="Purchases" active />
            <NavItem icon={Package} label="Inventory" />
            <NavItem icon={Wallet} label="Payments" />
            <NavItem icon={FileText} label="Reports" />
            <Separator className="my-4" />
            <NavItem icon={Settings} label="Settings" />
          </nav>
        </SheetContent>
      </Sheet> */}
    </div>
  );
}

// function NavItem({
//   icon: Icon,
//   label,
//   active,
// }: {
//   icon: React.ElementType;
//   label: string;
//   active?: boolean;
// }) {
//   return (
//     <button
//       className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
//         active
//           ? "bg-primary text-primary-foreground shadow-sm"
//           : "text-muted-foreground hover:bg-muted hover:text-foreground"
//       }`}
//     >
//       <Icon className="h-4 w-4" />
//       {label}
//     </button>
//   );
// }

//
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="max-w-[220px] truncate text-right text-sm font-medium">
        {value}
      </span>
    </div>
  );
}

//
//
