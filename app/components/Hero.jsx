"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: "#f7f1eb",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          gap: "40px"
        }}
      >

        {/* LEFT CONTENT */}

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ flex: 1 }}
        >
          <h1
            style={{
              fontSize: "52px",
              lineHeight: "1.2",
              color: "#3e2c23",
              marginBottom: "20px",
              fontWeight: "600"
            }}
          >
            Authentic Gujarati Taste,
            <br />
            Ready When You Are
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#6b5b52",
              marginBottom: "30px"
            }}
          >
            Preservative-free meals crafted for modern life.
          </p>

          {/* BUTTONS */}

          <div style={{ display: "flex", gap: "15px", marginBottom: "40px" }}>

            <button
              style={{
                background: "#8b2e1f",
                color: "white",
                padding: "14px 32px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Shop Now
            </button>

            <button
              style={{
                background: "transparent",
                color: "#3e2c23",
                padding: "14px 32px",
                border: "1px solid #3e2c23",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Explore Products
            </button>

          </div>

          {/* FEATURES */}

          <div style={{ display: "flex", gap: "40px", fontSize: "14px" }}>
            <span>✔ Preservative Free</span>
            <span>✔ No Artificial Additives</span>
            <span>✔ High Quality Ingredients</span>
          </div>

        </motion.div>


        {/* RIGHT SIDE IMAGES */}

        <div
          style={{
            flex: 1,
            position: "relative",
            height: "500px"
          }}
        >

          {/* BACK IMAGE */}

          <motion.img
            src="/banner2.png"
            alt="Banner 2"
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: "50px",
              left: "60px",
              width: "300px"
            }}
          />

          {/* MAIN IMAGE */}

          <motion.img
            src="/banner1.png"
            alt="Banner 1"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "380px"
            }}
          />

        </div>

      </div>
    </section>
  );
}