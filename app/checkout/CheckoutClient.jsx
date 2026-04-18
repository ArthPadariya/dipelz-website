"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import AddressSection from "../components/AddressSection";

export default function CheckoutClient() {

  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    cart,
    clearCart,
    addToCart,
    updateQuantity,
    removeFromCart
  } = useCart();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  const [address, setAddress] = useState(null);

  //////////////////////////////////////////////////////
  // FETCH COUPONS
  //////////////////////////////////////////////////////

  useEffect(() => {

    const fetchCoupons = async () => {

      try {

        const res = await fetch("/api/coupons");
        const data = await res.json();

        if (Array.isArray(data)) {
          setAvailableCoupons(data);
        }

      } catch (err) {

        console.error("Coupon fetch error", err);

      }

    };

    fetchCoupons();

  }, []);

  //////////////////////////////////////////////////////
  // QUANTITY CONTROLS
  //////////////////////////////////////////////////////

  const increaseQty = (item) => {

    if (item.quantity >= 10) return;

    updateQuantity(
      item.cartItemId || item.id,
      item.quantity + 1
    );

  };

  const decreaseQty = (item) => {

    if (item.quantity <= 1) return;

    updateQuantity(
      item.cartItemId || item.id,
      item.quantity - 1
    );

  };

  const removeItem = (item) => {

    removeFromCart(item.cartItemId || item.id);

  };

  //////////////////////////////////////////////////////
  // TOTALS
  //////////////////////////////////////////////////////

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const deliveryFee =
    subtotal >= 399 ? 0 : 40;

  const total =
    subtotal + deliveryFee - discount;

  //////////////////////////////////////////////////////
  // APPLY COUPON
  //////////////////////////////////////////////////////

  const applyCoupon = () => {

    if (!coupon) return;

    const found = availableCoupons.find(
      c => c.code.toLowerCase() === coupon.toLowerCase()
    );

    if (!found) {

      setError("Invalid coupon");
      return;

    }

    const discountValue =
      (subtotal + deliveryFee) *
      (found.discount / 100);

    setDiscount(discountValue);
    setError("");

  };

  //////////////////////////////////////////////////////
  // PLACE ORDER
  //////////////////////////////////////////////////////

  const handlePlaceOrder = async () => {

    if (placingOrder) return;

    if (status === "loading") return;

    if (!session) {

      router.push("/login?callbackUrl=/checkout");
      return;

    }

    if (!address) {

      setError("Please enter delivery address");
      return;

    }

    setPlacingOrder(true);

    try {

      const res = await fetch("/api/orders", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          address,
          couponCode: coupon
        })

      });

      const data = await res.json();

      if (!res.ok) {

        setError(data.error || "Order failed");
        setPlacingOrder(false);
        return;

      }

      await clearCart();

      router.push(`/payment/${data.id}`);

    } catch {

      setError("Something went wrong");
      setPlacingOrder(false);

    }

  };

  //////////////////////////////////////////////////////
  // LOADING STATE
  //////////////////////////////////////////////////////

  if (status === "loading") {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading checkout...
      </div>
    );

  }

  //////////////////////////////////////////////////////
  // EMPTY CART
  //////////////////////////////////////////////////////

  if (!cart.length) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Your cart is empty
      </div>
    );

  }

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-3xl mx-auto space-y-6">

        {/* CART */}

        <div className="bg-white rounded-xl shadow p-6 space-y-4">

          <h2 className="text-xl font-semibold">
            Your Items
          </h2>

          {cart.map((item) => (

            <div
              key={item.cartItemId || item.id}
              className="flex justify-between items-center border-b pb-4"
            >

              <div className="flex gap-4 items-center">

                <img
                  src={item.images?.[0]}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div>

                  <p className="font-medium">
                    {item.name}
                  </p>

                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() => decreaseQty(item)}
                      className="w-7 h-7 border rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="w-7 h-7 border rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item)}
                      className="text-red-500 text-xs ml-3"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

              <p>₹{item.price * item.quantity}</p>

            </div>

          ))}

        </div>

        {/* COUPON */}

        <div className="bg-white rounded-xl shadow p-6">

          <h3 className="font-semibold mb-3">
            Apply Coupon
          </h3>

          <div className="flex gap-3">

            <select
              value={coupon}
              onChange={(e)=>setCoupon(e.target.value)}
              className="border rounded-lg px-4 py-2 flex-1"
            >

              <option value="">
                Select Coupon
              </option>

              {availableCoupons.map(c => (

                <option key={c.id} value={c.code}>
                  {c.code} ({c.discount}% OFF)
                </option>

              ))}

            </select>

            <button
              onClick={applyCoupon}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Apply
            </button>

          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

        </div>

        <AddressSection onAddressChange={setAddress} />

      </div>

      {/* STICKY BAR */}

      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">

        <div className="max-w-3xl mx-auto flex justify-between items-center">

          <div className="font-semibold text-lg">
            ₹{total.toFixed(2)}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            {placingOrder ? "Processing..." : "Place Order"}
          </button>

        </div>

      </div>

    </div>

  );

}