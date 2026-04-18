"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ShopSection() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("best");
  const dropdownRef = useRef(null);

  // Fetch Products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ FIXED CATEGORY FILTER (Case Safe)
  const filteredProducts =
    category === "best"
      ? products.filter((product) => product.bestSeller)
      : category === "all"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="bg-[#f8f4ef] min-h-screen">
      {/* HERO */}
      <section className="py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-[#3e2c23]"
        >
          Explore Our Collection
        </motion.h1>
      </section>

      {/* FILTER SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="text-center mb-16 relative" ref={dropdownRef}>
          <h2 className="text-3xl font-semibold inline-flex items-center gap-3 text-[#3e2c23]">
            Shop Our Ready to Eat

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 border-b border-black hover:opacity-70 transition"
            >
              {category === "best"
                ? "Best Sellers"
                : category === "all"
                ? "All Items"
                : category}

              <span
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
          </h2>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 mt-4 w-52 bg-white shadow-xl rounded-lg border z-50"
              >
                {[
                  "best",
                  "all",
                  "Breakfast",
                  "Combo",
                  "MainCourse",
                  "Rice",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-sm"
                  >
                    {cat === "best"
                      ? "Best Sellers"
                      : cat === "all"
                      ? "All Items"
                      : cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PRODUCTS GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}