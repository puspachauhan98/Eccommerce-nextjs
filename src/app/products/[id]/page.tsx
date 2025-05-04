import { stripe } from "../../../lib/stripe";
import { ProductDetail } from "../../../components/product-detail";
import Stripe from "stripe";

// ✅ Define a clean type for the route params
interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product)) as Stripe.Product;

  return <ProductDetail product={plainProduct} />;
}
