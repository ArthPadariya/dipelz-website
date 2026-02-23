"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0;

  return (
    <div className="product-card">

      {/* Badges */}
      <div className="badge-container">
        {product.bestSeller && (
          <span className="best-badge">Best Seller</span>
        )}

        {discount > 0 && (
          <span className="discount-badge">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Image */}
      <div className="image-wrapper">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="product-image"
        />
      </div>

      {/* Title */}
      <h3 className="product-title">{product.name}</h3>

      {/* Rating */}
      <div className="rating">⭐ {product.rating}</div>

      {/* Price */}
      <div className="price">
        <span className="new-price">₹{product.price}</span>
        {product.oldPrice > product.price && (
          <span className="old-price">
            ₹{product.oldPrice}
          </span>
        )}
      </div>

      {/* Quantity */}
      <div className="quantity-selector">
        <button
          onClick={() =>
            setQuantity(quantity > 1 ? quantity - 1 : 1)
          }
        >
          -
        </button>

        <span>{quantity}</span>

        <button
          onClick={() =>
            setQuantity(quantity < 10 ? quantity + 1 : 10)
          }
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button className="cart-btn">
        Add to cart
      </button>

    </div>
  );
}