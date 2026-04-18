"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";
import ReviewForm from "./ReviewForm";

export default function ProductPageClient({
  product,
  reviews = [],
  relatedProducts = [],
}) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]);
  const [activeTab, setActiveTab] = useState("description");

  const isOutOfStock = product.stock === 0;
  const reviewCount = reviews.length;

  const isWishlisted = wishlist.some(
    (item) => item.productId === product.id
  );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

      {/* ================= TOP SECTION ================= */}
      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT - IMAGE */}
        <div>
          <div className="relative w-full h-[520px] bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain p-16 transition duration-500 hover:scale-105"
              />
            )}
          </div>

          <div className="flex gap-4 mt-6">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(img)}
                className="relative w-20 h-20 border rounded-lg cursor-pointer hover:border-black transition"
              >
                <Image
                  src={img}
                  alt="thumb"
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - INFO */}
        <div className="space-y-6">

          {/* TITLE + HEART */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>

            <motion.button
              whileTap={{ scale: 0.7 }}
              onClick={() => toggleWishlist(product.id)}
              className="text-2xl"
            >
              {isWishlisted ? "❤️" : "🤍"}
            </motion.button>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-4">
            <span className="text-3xl text-red-600 font-semibold">
              ₹ {product.price}
            </span>

            {product.oldPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹ {product.oldPrice}
              </span>
            )}
          </div>

          {/* STOCK */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Only {product.stock} left in stock
            </p>

            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(product.stock, 100)}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-gray-600">
              ⭐ {reviewCount} Customer Reviews
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-10 h-10 border rounded"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() =>
                quantity < product.stock && setQuantity(quantity + 1)
              }
              className="w-10 h-10 border rounded"
            >
              +
            </button>
          </div>

          {/* Add To Cart */}
          <button
            onClick={() => addToCart(product, quantity)}
            disabled={isOutOfStock}
            className="w-full bg-black text-white py-4 rounded-xl text-lg hover:bg-gray-800 transition"
          >
            {isOutOfStock ? "Out of Stock" : "Add To Cart"}
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-gray-600 border-t">
            <div>🚚 Fast Delivery</div>
            <div>🔒 Secure Payments</div>
            <div>⭐ Premium Quality</div>
            <div>📞 24/7 Support</div>
          </div>
        </div>
      </div>

      {/* ================= TABS SECTION ================= */}
      <div className="mt-24">

        <div className="flex gap-8 border-b pb-4 text-lg font-medium">
          {["description", "ingredients", "steps", "faq", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize ${
                activeTab === tab
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10"
        >
          {activeTab === "description" && (
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          )}

          {activeTab === "ingredients" && (
            <p className="text-gray-700 leading-relaxed">
              {product.content?.ingredients || "No ingredients listed."}
            </p>
          )}

          {activeTab === "reviews" && (
            <div>
              <ReviewForm productId={product.id} />
              <div className="mt-10 space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                    {"⭐".repeat(review.rating)}
                    <p className="mt-2">{review.comment}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      — {review.username}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* RELATED */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl font-semibold mb-10">
            You May Also Like
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={item.images?.[0]}
                    alt={item.name}
                    fill
                    className="object-contain group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="mt-4 font-medium">{item.name}</h3>
                <p className="text-red-600 mt-2">₹ {item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}