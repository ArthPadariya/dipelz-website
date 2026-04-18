"use client";

import { useState } from "react";

export default function ReviewForm({ productId }) {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        rating,
        comment,
        productId,
      }),
    });

    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-xl font-semibold">
        Write a Review
      </h3>

      <input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full border p-3 rounded"
      >
        {[5, 4, 3, 2, 1].map((num) => (
          <option key={num} value={num}>
            {num} Stars
          </option>
        ))}
      </select>

      <textarea
        placeholder="Your Review"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />

      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        Submit Review
      </button>
    </form>
  );
}