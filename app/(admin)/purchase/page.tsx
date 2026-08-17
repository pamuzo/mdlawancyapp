import { getPurchases } from "@/lib/actions/purchase.action";
import PurchasePageClient from "./purchasePageClient";

export default async function PurchasesPage() {
  const purchases = (await getPurchases()).map((purchase) => ({
    ...purchase,
    cost: Number(purchase.cost),
    deposit: Number(purchase.deposit),
    balance: Number(purchase.balance),
    totalPrice: Number(purchase.totalPrice),
  }));

  return <PurchasePageClient purchases={purchases} />;
}
