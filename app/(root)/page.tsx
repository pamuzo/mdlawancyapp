import { Button } from "@/components/ui/button";
import { getLatestProducts } from "@/lib/actions/production.actions";
import ProductList from "@/components/shared/product/productList";
import Hero from "@/components/Hero";
import AdsterraBanner from "@/adsterra/adsterra";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <Hero />
      <ProductList data={latestProducts} title="Featured Products" limit={4} />
      <AdsterraBanner />
    </div>
  );
};

export default Homepage;
