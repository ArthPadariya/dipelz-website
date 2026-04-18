"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDrawer() {

  const {
    cart,
    removeFromCart,
    updateQuantity,
    addToCart,
    isOpen,
    setIsOpen,
  } = useCart();

  const router = useRouter();

  const [suggested, setSuggested] = useState([]);

  //////////////////////////////////////////////////////
  // LOAD SUGGESTED PRODUCTS
  //////////////////////////////////////////////////////

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const safeProducts = Array.isArray(data) ? data : [];

        const filtered = safeProducts.filter(
          (product) => !cart.some((c) => c.id === product.id)
        );

        const shuffled = [...filtered].sort(
          () => 0.5 - Math.random()
        );

        setSuggested(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Suggested products failed:", error);
        setSuggested([]);
      }
    };

    loadSuggestions();
  }, [cart]);

  //////////////////////////////////////////////////////
  // SUBTOTAL
  //////////////////////////////////////////////////////

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  //////////////////////////////////////////////////////
  // FREE DELIVERY PROGRESS
  //////////////////////////////////////////////////////

  const freeDeliveryTarget = 499;

  const progress = Math.min(
    (subtotal / freeDeliveryTarget) * 100,
    100
  );

  //////////////////////////////////////////////////////
  // CHECKOUT
  //////////////////////////////////////////////////////

  const handleCheckout = () => {

    if (cart.length === 0) return;

    setIsOpen(false);
    router.push("/checkout");

  };

  //////////////////////////////////////////////////////
  // QUANTITY
  //////////////////////////////////////////////////////

  const increaseQty = (item) => {

    if (item.quantity >= 10) return;

    updateQuantity(item.cartItemId || item.id, item.quantity + 1);

  };

  const decreaseQty = (item) => {

    if (item.quantity <= 1) return;

    updateQuantity(item.cartItemId || item.id, item.quantity - 1);

  };

  const removeItem = (item) => {

    removeFromCart(item.cartItemId || item.id);

  };

  return (

    <AnimatePresence>

      {isOpen && (
        <>

          {/* OVERLAY */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* DRAWER */}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed top-0 right-0 h-full w-[420px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
          >

            {/* HEADER */}

            <div className="p-6 border-b flex justify-between items-center">

              <h2 className="text-xl font-semibold">
                Your Cart
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-lg"
              >
                ✕
              </button>

            </div>


            {/* CART ITEMS */}

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

              {cart.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Your cart is empty
                </p>
              )}

              {cart.map((item, index) => (

                <motion.div
                  key={`${item.id}-${index}`}
                  layout
                  className="flex gap-4 border-b pb-5"
                >

                  <div className="w-20 h-20 relative bg-gray-50 rounded-lg">

                    <Image
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />

                  </div>

                  <div className="flex-1">

                    <h4 className="text-sm font-medium">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-600 mt-1">
                      ₹ {item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() => decreaseQty(item)}
                        className="w-8 h-8 border rounded"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item)}
                        className="w-8 h-8 border rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item)}
                        className="text-xs text-red-500 ml-3"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </motion.div>

              ))}


              {/* FREE DELIVERY BAR */}

              {cart.length > 0 && (

                <div className="bg-gray-50 p-4 rounded-lg">

                  <p className="text-xs text-gray-600 mb-2">

                    {subtotal >= freeDeliveryTarget
                      ? "🎉 You unlocked FREE delivery!"
                      : `Add ₹${freeDeliveryTarget - subtotal} more for FREE delivery`}

                  </p>

                  <div className="w-full bg-gray-200 h-2 rounded">

                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{ width: `${progress}%` }}
                    />

                  </div>

                </div>

              )}


              {/* SUGGESTED PRODUCTS */}

              {cart.length > 0 && suggested.length > 0 && (

                <div className="pt-4 border-t">

                  <h3 className="text-sm font-semibold mb-4">
                    You may also like
                  </h3>

                  <div className="space-y-4">

                    {suggested.map(product => (

                      <div
                        key={product.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >

                        <div className="flex gap-3 items-center">

                          <div className="w-12 h-12 relative">

                            <Image
                              src={product.images?.[0]}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />

                          </div>

                          <div>

                            <p className="text-sm font-medium">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              ₹ {product.price}
                            </p>

                          </div>

                        </div>

                        <button
                          onClick={() => addToCart(product,1)}
                          className="text-xs px-3 py-1 bg-black text-white rounded"
                        >
                          Add
                        </button>

                      </div>

                    ))}

                  </div>

                </div>

              )}

            </div>


            {/* FOOTER */}

            <div className="p-6 border-t bg-gray-50 space-y-4">

              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>₹ {subtotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                Checkout
              </button>

            </div>

          </motion.div>

        </>
      )}

    </AnimatePresence>

  );
}
