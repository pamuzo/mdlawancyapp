import { Button } from "@/components/ui/button";
import { getLatestProducts } from "@/lib/actions/production.actions";
import ProductList from "@/components/shared/product/productList";
import Hero from "@/components/Hero";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <Hero />
      <ProductList data={latestProducts} title="Featured Products" limit={4} />
      <p>This is the main page of our application.</p>
      <Button>Get Started</Button>
    </div>
  );
};

export default Homepage;
