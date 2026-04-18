"use client";

import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Pankaj Sharma",
    title: "Surat ka asli swad",
    text: "Yeh dish khate hi Surat ki yaad aa gayi! Authentic aur bilkul ghar jaisa taste.",
  },
  {
    id: 2,
    name: "Sanjeev Kumar",
    title: "Best Combo for All",
    text: "Yeh combo sabko pasand aaya. Har dish ka apna hi maza tha.",
  },
  {
    id: 3,
    name: "Manish Verma",
    title: "Ekdam Chatpata",
    text: "Jo log spicy aur chatpata pasand karte hain, unke liye yeh best hai.",
  },
  {
    id: 4,
    name: "Ravi Patel",
    title: "Amazing Taste",
    text: "Packaging aur taste dono top level hai.",
  },
];

export default function Testimonials() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="text-center mb-10">
        <span className="bg-red-500 text-white px-4 py-2 rounded-md">
          Happy Customers
        </span>
        <div className="mt-2 text-yellow-500">⭐⭐⭐⭐⭐</div>
        <p className="text-sm text-gray-500">from 424 reviews</p>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* LEFT BUTTON */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 z-10"
        >
          ◀
        </button>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-10"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.text}</p>
              <p className="mt-4 font-medium text-sm">{item.name}</p>
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 z-10"
        >
          ▶
        </button>

      </div>
    </div>
  );
}