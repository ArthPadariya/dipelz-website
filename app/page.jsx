"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import CategoryCard from "./components/CategoryCard";
import Testimonials from "./components/Testimonials";
import ShopSection from "./components/ShopSection";

export default function Home() {
  const slides = [
    {
      image: "/banner1.png",
      title: "Dipelz Foodz Crafted For Cravings",
      description:
        "Premium ready-to-eat meals inspired by traditional recipes and made with uncompromised quality..",
    },
    {
      image: "/banner2.png",
      title: "Pure Taste. Real Tradition.",
      description:
        "Finest ready-to-eat meals inspired by traditional recipes and made with uncompromised quality.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full"
          >
            <Image
              src={slides[index].image}
              alt="Dipelz Banner"
              width={1920}
              height={800}
              priority
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 flex justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={index + "-text"}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl text-left"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-[#3e2c23] leading-tight">
                  {slides[index].title}
                </h1>

                <p className="mt-6 text-gray-700 text-lg">
                  {slides[index].description}
                </p>

                <Link href="/shop">
                  <button className="mt-8 bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition duration-300">
                    Shop Now
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/*  THIS WAS MISSING */}
      <ShopSection />

      {/* CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold mb-10">
          Shop by Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <CategoryCard title="Combo" image="/combo.jpeg" />
          <CategoryCard title="Breakfast" image="/poha.PNG" />
          <CategoryCard title="Rice" image="/masalarice.jpeg" />
          <CategoryCard title="Maincourse" image="/sambhar.jpeg" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Testimonials />
      </section>

    </div>
  );
}