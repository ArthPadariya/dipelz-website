"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
  };

  return (
    <div className="bg-white rounded-xl p-4 hover:shadow-lg transition duration-300">
      
      <Link href={`/product/${product.slug}`}>
        <div className="cursor-pointer">

          {/* IMAGE CONTAINER */}
          <div className="relative w-full h-[260px] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">

            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                width={300}
                height={300}
                className="object-contain w-full h-full p-6 transition duration-300 hover:scale-105"
              />
            ) : (
              <div className="text-gray-400 text-sm">
                No Image
              </div>
            )}

            {product.bestSeller && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full">
                Best Seller
              </div>
            )}

            {isOutOfStock && (
              <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-1 rounded-full">
                Out of Stock
              </div>
            )}

          </div>

          <h3 className="mt-4 text-sm font-medium text-gray-800 hover:text-black transition">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="mt-2 flex items-center gap-5">
        <span className="text-red-600 font-semibold text-sm">
          Rs. {product.price}.00
        </span>
      </div>

      {/* Quantity */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          className="w-8 h-8 border rounded"
        >
          -
        </button>

        <span className="px-3">{quantity}</span>

        <button
          onClick={() =>
            quantity < product.stock && setQuantity(quantity + 1)
          }
          className="w-8 h-8 border rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`mt-5 w-full py-2.5 rounded-md text-sm transition duration-300 ${
          isOutOfStock
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "border border-black text-black hover:bg-black hover:text-white"
        }`}
      >
        {isOutOfStock ? "Out of Stock" : "Add to cart"}
      </button>

    </div>
  );
}