import { ProductList } from "../../components/product-list";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";

export default async function ProductsPage() {
  // Fetch products from Stripe
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="pb-8">
      <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        All Products
      </h1>
      {/* Pass the products to the ProductList component */}
      <ProductList products={products.data} />
    </div>
  );
}
