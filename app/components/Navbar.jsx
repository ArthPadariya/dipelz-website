"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { User, Heart, ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {

  const { data: session } = useSession();
  const { setIsOpen, cartCount } = useCart();
  const { wishlist } = useWishlist();

  return (

    <header
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "80px",
        background: "#f5efe8",
        borderBottom: "1px solid #e5ddd5",
        display: "flex",
        alignItems: "center",
        zIndex: 1000
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px"
        }}
      >

        {/* LEFT MENU */}

        <nav style={{ display: "flex", gap: "25px", flex: 1 }}>

          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/shop" style={linkStyle}>Shop</Link>
          <Link href="/about" style={linkStyle}>About</Link>
          <Link href="/contact" style={linkStyle}>Contact</Link>

        </nav>

        {/* LOGO */}

        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>

          <img
            src="/logo.png"
            style={{ height: "85px" }}
          />

        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "20px"
          }}
        >

          <SearchBar />

          {session ? (
            <Link href="/profile">
              <User size={20} />
            </Link>
          ) : (
            <Link href="/login">
              <User size={20} />
            </Link>
          )}

          {/* WISHLIST */}

          <Link href="/wishlist" style={{ position: "relative" }}>

            <Heart size={20} />

            {wishlist.length > 0 && (

              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "10px",
                  padding: "2px 6px"
                }}
              >
                {wishlist.length}
              </span>

            )}

          </Link>

          {/* CART */}

          <div style={{ position: "relative", cursor: "pointer" }}>

            <ShoppingCart
              size={20}
              onClick={() => setIsOpen(true)}
            />

            {cartCount > 0 && (

              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  background: "black",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "10px",
                  padding: "2px 6px"
                }}
              >
                {cartCount}
              </span>

            )}

          </div>

        </div>

      </div>

    </header>

  );

}

const linkStyle = {
  textDecoration: "none",
  color: "#3e2c23",
  fontWeight: "500",
  fontSize: "15px"
};