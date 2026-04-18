"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const { data: session } = useSession();

  const [wishlist, setWishlist] = useState([]);

  //////////////////////////////////////////////////////
  // FETCH WISHLIST
  //////////////////////////////////////////////////////

  const fetchWishlist = async () => {

    try {

      const res = await fetch("/api/wishlist");
      const data = await res.json();

      setWishlist(data || []);

    } catch (err) {

      console.error("Wishlist fetch error:", err);

    }

  };

  //////////////////////////////////////////////////////
  // TOGGLE WISHLIST
  //////////////////////////////////////////////////////

  const toggleWishlist = async (productId) => {

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId })
    });

    if (res.status === 401) {

      toast.error("Please login first");
      return;

    }

    const data = await res.json();

    if (data.added) {

      toast.success("Added to wishlist ❤️");

    }

    if (data.removed) {

      toast("Removed from wishlist", { icon: "💔" });

    }

    fetchWishlist();

  };

  //////////////////////////////////////////////////////
  // REFRESH WISHLIST WHEN LOGIN STATE CHANGES
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchWishlist();

  }, [session]);

  return (

    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

}

export const useWishlist = () => useContext(WishlistContext);