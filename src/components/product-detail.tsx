"use client"; 


import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "../../store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();

  const price = product.default_price as Stripe.Price;
  const unitAmount = price?.unit_amount || 0; // Fallback to 0 if undefined
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: unitAmount,
      imageUrl: product.images?.[0] || null, // Fallback to null if no image
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images?.[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {unitAmount > 0 && (
          <p className="text-lg font-semibold text-gray-900">
            ${(unitAmount / 100).toFixed(2)}
          </p>
        )}

        <div className="flex items-center space-x-4">
          <Button onClick={() => removeItem(product.id)} variant="outline">
            -
          </Button>
          <span>{quantity}</span>
          <Button onClick={onAddItem} variant="outline">
            +
          </Button>
        </div>
      </div>
    </div>
  );
};