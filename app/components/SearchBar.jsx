"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function SearchBar() {

  const { addToCart } = useCart();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);

  const searchRef = useRef();

  ////////////////////////////////////////////////////////
  // CLOSE WHEN CLICK OUTSIDE
  ////////////////////////////////////////////////////////

  useEffect(() => {

    const handleClick = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);

  }, []);

  ////////////////////////////////////////////////////////
  // FAST SEARCH (SMOOTHER)
  ////////////////////////////////////////////////////////

  useEffect(() => {

    const timer = setTimeout(async () => {

      if (query.length < 2) {
        setResults([]);
        return;
      }

      try {

        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();

        setResults(data);
        setOpen(true);

      } catch (err) {
        console.error(err);
      }

    }, 150);

    return () => clearTimeout(timer);

  }, [query]);

  ////////////////////////////////////////////////////////
  // TRENDING SEARCHES
  ////////////////////////////////////////////////////////

  const trending = [
    "Khichdi",
    "Organic Food",
    "Healthy Meals",
    "Ready To Eat"
  ];

  ////////////////////////////////////////////////////////
  // UI
  ////////////////////////////////////////////////////////

  return (

    <div ref={searchRef} style={{ position: "relative", width: "320px" }}>

      {/* SEARCH BAR */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: "30px",
          border: "1px solid #ddd",
          padding: "8px 14px",
          transition: "all 0.2s ease"
        }}
      >

        <Search size={16} color="#777" />

        <input
          placeholder="Search food..."
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {

            const value = e.target.value;

            setQuery(value);

            if (value.length === 0) {
              setOpen(false);
            }

          }}
          style={{
            border: "none",
            outline: "none",
            marginLeft: "8px",
            width: "100%",
            fontSize: "14px",
            background: "transparent"
          }}
        />

      </div>

      {/* DROPDOWN */}

      <div
        style={{
          position: "absolute",
          top: "45px",
          width: "100%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
          overflow: "hidden",
          transform: open ? "translateY(0)" : "translateY(-10px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "all 0.25s ease",
          zIndex: 999
        }}
      >

        {/* TRENDING */}

        {query.length < 2 && open && (

          <div style={{ padding: "14px" }}>

            <p
              style={{
                fontSize: "12px",
                color: "#999",
                marginBottom: "8px"
              }}
            >
              Trending Searches
            </p>

            {trending.map((item) => (

              <div
                key={item}
                onClick={() => setQuery(item)}
                style={{
                  padding: "6px 0",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                🔥 {item}
              </div>

            ))}

          </div>

        )}

        {/* RESULTS */}

        {results.map((product) => (

          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              borderTop: "1px solid #f3f3f3"
            }}
          >

            <Link
              href={`/product/${product.slug}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "#333"
              }}
            >

              <img
                src={product.images?.[0]}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  objectFit: "cover"
                }}
              />

              <div>

                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                  {product.name}
                </p>

                <p style={{ fontSize: "13px", color: "#888" }}>
                  ₹{product.price}
                </p>

              </div>

            </Link>


            {/* ADD BUTTON */}

            <button
              onClick={() => addToCart(product, 1)}
              style={{
                background: "#111",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer"
              }}
            >
              Add
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}