"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const { data: session } = useSession();

  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////
  // LOCAL CACHE
  //////////////////////////////////////////////////////

  const saveCartCache = (cartData) => {
    localStorage.setItem("cart_cache", JSON.stringify(cartData));
  };

  const loadCartCache = () => {

    const cache = localStorage.getItem("cart_cache");

    if (!cache) return [];

    try {
      return JSON.parse(cache);
    } catch {
      return [];
    }

  };

  //////////////////////////////////////////////////////
  // LOAD CART FROM SERVER
  //////////////////////////////////////////////////////

  const loadCart = async () => {

    try {

      const res = await fetch("/api/cart");
      const data = await res.json();

      if (!data?.items) return;

      const normalized = data.items.map((item) => ({
        ...item.product,
        quantity: item.quantity,
        cartItemId: item.id
      }));

      setCart(normalized);
      saveCartCache(normalized);

    } catch (error) {

      console.error("Cart load error:", error);

    }

  };

  //////////////////////////////////////////////////////
  // MERGE GUEST CART
  //////////////////////////////////////////////////////

  const mergeGuestCart = async () => {

    const guestCart = localStorage.getItem("guest_cart");

    if (!guestCart) return;

    try {

      const items = JSON.parse(guestCart);

      if (!items.length) return;

      await fetch("/api/cart/merge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        })
      });

      localStorage.removeItem("guest_cart");

    } catch {

      console.error("Guest cart merge error");

    }

  };

  //////////////////////////////////////////////////////
  // INITIALIZE CART
  //////////////////////////////////////////////////////

  useEffect(() => {

    const init = async () => {

      if (session) {

        await mergeGuestCart();
        await loadCart();

      } else {

        const cached = loadCartCache();

        if (cached.length) {
          setCart(cached);
        }

        const guestCart = localStorage.getItem("guest_cart");

        if (guestCart) {
          setCart(JSON.parse(guestCart));
        }

      }

      setLoading(false);

    };

    init();

  }, [session]);

  //////////////////////////////////////////////////////
  // SAVE GUEST CART
  //////////////////////////////////////////////////////

  const saveGuestCart = (updatedCart) => {

    localStorage.setItem(
      "guest_cart",
      JSON.stringify(updatedCart)
    );

  };

  //////////////////////////////////////////////////////
  // ADD TO CART (OPTIMISTIC)
  //////////////////////////////////////////////////////

  const addToCart = async (product, quantity = 1) => {

    if (quantity > 10) quantity = 10;

    const existing = cart.find(i => i.id === product.id);

    let updatedCart;

    if (existing) {

      const newQty = Math.min(existing.quantity + quantity, 10);

      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: newQty }
          : item
      );

    } else {

      updatedCart = [
        ...cart,
        { ...product, quantity }
      ];

    }

    setCart(updatedCart);
    saveCartCache(updatedCart);

    if (!session) {

      saveGuestCart(updatedCart);
      setIsOpen(true);
      return;

    }

    try {

      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: product.id,
          quantity
        })
      });

    } catch {

      console.error("Add to cart failed");

    }

    setIsOpen(true);

  };

  //////////////////////////////////////////////////////
  // UPDATE QUANTITY (OPTIMISTIC)
  //////////////////////////////////////////////////////

  const updateQuantity = async (productId, quantity) => {

    if (quantity < 1) return;
    if (quantity > 10) quantity = 10;

    const previousCart = [...cart];

    const updatedCart = cart.map(item =>
      (item.cartItemId || item.id) === productId
        ? { ...item, quantity }
        : item
    );

    setCart(updatedCart);
    saveCartCache(updatedCart);

    try {

      if (session) {

        await fetch("/api/cart/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            productId,
            quantity
          })
        });

      } else {

        saveGuestCart(updatedCart);

      }

    } catch {

      setCart(previousCart);

    }

  };

  //////////////////////////////////////////////////////
  // REMOVE ITEM
  //////////////////////////////////////////////////////

  const removeFromCart = async (id) => {

    const previousCart = [...cart];

    const updatedCart = cart.filter(
      item => (item.cartItemId || item.id) !== id
    );

    setCart(updatedCart);
    saveCartCache(updatedCart);

    try {

      if (session) {

        await fetch("/api/cart/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ productId: id })
        });

      } else {

        saveGuestCart(updatedCart);

      }

    } catch {

      setCart(previousCart);

    }

  };

  //////////////////////////////////////////////////////
  // CLEAR CART
  //////////////////////////////////////////////////////

  const clearCart = async () => {

    setCart([]);

    localStorage.removeItem("cart_cache");

    if (session) {

      await fetch("/api/cart/clear", {
        method: "POST"
      });

    } else {

      localStorage.removeItem("guest_cart");

    }

  };

  //////////////////////////////////////////////////////
  // CART COUNT
  //////////////////////////////////////////////////////

  const cartCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (

    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {
  return useContext(CartContext);
}