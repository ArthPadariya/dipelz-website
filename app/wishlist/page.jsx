"use client";

import { useWishlist } from "../context/WishlistContext";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto pt-32 px-6">
      <h1 className="text-3xl font-semibold mb-10">
        Your Wishlist
      </h1>

      {wishlist.length === 0 && (
        <p className="text-gray-500">
          No items in wishlist.
        </p>
      )}

      <div className="grid md:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.product.slug}`}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={item.product.images?.[0]}
                alt={item.product.name}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="mt-4 font-medium">
              {item.product.name}
            </h3>

            <p className="text-red-600 mt-2">
              ₹ {item.product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}