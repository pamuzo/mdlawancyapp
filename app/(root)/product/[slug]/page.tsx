import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/actions/production.actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Product } from "@/types";
import ProductImages from "@/components/shared/product/product-images";
import { CheckCircle2, Star } from "lucide-react";
// import AddToCart from "@/components/shared/product/add-to-cart";

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const product = (await getProductBySlug(slug)) as any;
  if (!product) notFound();

  const specifications = [
    { label: "Material", value: product.material },
    { label: "Capacity", value: product.capacity },
    { label: "Color", value: product.color },
    { label: "Finish", value: product.finish },
    { label: "Style", value: product.style },
    { label: "Compatibility", value: product.compatibility },
    { label: "Size", value: product.size },
    { label: "Print Type", value: product.printType },
  ].filter((item) => item.value);

  return (
    <>
      <section>
        <div className="grid grid-col-1 md:grid-cols-5">
          {/* Image colum */}
          <div className="md:col-span-2">
            <ProductImages images={product.images} />
          </div>

          {/* Product details column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>

              {product.isFeatured && (
                <Badge className="mt-3 bg-orange-500 hover:bg-orange-600">
                  Featured Product
                </Badge>
              )}

              {/* Ratings */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < Math.round(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p>
                  {product.rating} of {product.numReviews} reviews
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 ">
                <p className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2 text-center font-medium">
                  ${product.price}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p className="mt-2 text-sm text-gray-600">
                {product.description}
              </p>
            </div>
          </div>

          {/* Action Column  */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price:</div>
                  <p className="font-semibold">${product.price}</p>
                </div>

                <div className="mb-2 flex justify-between">
                  <div>Status:</div>
                  {product.stock > 0 ? (
                    <Badge variant={"outline"}>In Stock</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Out of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className="flex-center ">
                    <Button className="w-full">Add to Cart</Button>
                    {/* <AddToCart
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images[0],
                      }}
                    /> */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Key Features</h2>

              <ul className="space-y-2">
                {product.features.map((feature: any) => (
                  <li
                    key={feature.id}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-600" />
                    {feature.feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {specifications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Specifications</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 border rounded-lg overflow-hidden">
                {specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between border-b px-4 py-3 text-sm"
                  >
                    <span className="font-medium">{spec.label}</span>

                    <span className="text-muted-foreground">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Tags</h2>

              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: any) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-10"></div>
      </section>
    </>
  );
};
export default ProductDetailsPage;
