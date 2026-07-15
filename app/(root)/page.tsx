import { getLatestProducts } from "@/lib/actions/production.actions";
import ProductList from "@/components/shared/product/productList";
import Hero from "@/components/Hero";
import HeroSection from "@/components/shared/header/hero";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <HeroSection />
      <ProductList data={latestProducts} title="Featured Products" limit={4} />
      <Hero />
    </div>
  );
};

export default Homepage;
