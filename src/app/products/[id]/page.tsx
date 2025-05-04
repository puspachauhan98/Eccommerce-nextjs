import { stripe } from "../../../lib/stripe";
import { ProductDetail } from "../../../components/product-detail";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  try {
    const product = await stripe.products.retrieve(params.id, {
      expand: ["default_price"],
    });

    const plainProduct = JSON.parse(JSON.stringify(product));

    return <ProductDetail product={plainProduct} />;
  } catch (error) {
    console.error("Product fetch failed:", error);
    return notFound();
  }
}
