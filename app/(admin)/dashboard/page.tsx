import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLatestProducts } from "@/lib/actions/production.actions";
import { getSession } from "@/lib/get-session";
import { TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect("/forbidden");
  if (user.role !== "admin") {
    redirect("/forbidden");
  }

  const totalProducts = await getLatestProducts();

  const lowStock = totalProducts
    .map((product) => product.stock)
    .filter((product) => product < 100);

  const quatityOfAllProduct = totalProducts
    .map((product) => product.stock)
    .reduce((sum, quatity) => sum + Number(quatity), 0);

  const priceOfAllProduct = totalProducts
    .map((product) => product.price)
    .reduce((sum, totalPrice) => sum + Number(totalPrice), 0);

  const recent = totalProducts
    .map((product) => product)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  // .slice(0, 5);

  // console.log(recent);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Key Matrics
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold ">{totalProducts.length}</div>
              <p className="text-sm text-muted-foreground">Total Product</p>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-green-600">
                  +{totalProducts.length}
                </span>
                <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold ">
                ₦{Number(quatityOfAllProduct * priceOfAllProduct).toFixed(0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-green-600">
                  +₦{Number(quatityOfAllProduct * priceOfAllProduct).toFixed(0)}
                </span>
                <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold ">{lowStock.length}</div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-green-600">
                  +{lowStock.length}
                </span>
                <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory over time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              New Product per week
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* stock level */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Stock Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recent.map((product, key) => {
              const stockLevel =
                product.stock === 0 ? 0 : product.stock <= 8 ? 1 : 2;
              const bgColor = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
              const textColor = [
                "text-red-600",
                "text-yellow-600",
                "text-green-600",
              ];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 "
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${bgColor[stockLevel]}`}
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                  <div
                    className={`text-sm font-medium ${textColor[stockLevel]}`}
                  >
                    {product.stock} Units
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
