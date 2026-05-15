/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import ProductPrice from "./product-price";

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.url;
  return (
    <Card className="w-full pt-0 max-w-sm">
      <CardHeader className="p-0  items-center">
        <Link
          href={`/product/${product.slug}`}
          className="text-lg font-medium hover:underline"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            width={300}
            height={300}
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="text-xs">{product.brand}</div>
        <Link
          href={`/product/${product.slug}`}
          className="text-sm hover:underline"
        >
          <h2 className="text-sm font-medium">{product.name} </h2>
        </Link>
        <div className="flex-between gap-4">
          <p>{product.rating}⭐</p>

          {product.stock > 0 ? (
            <ProductPrice
              value={Number(product.price)}
              className=" text-green-600 font-bold"
            />
          ) : (
            <p className="text-red-600 font-medium">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
