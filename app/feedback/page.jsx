"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function FeedbackPage() {

  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    message: "",
    rating: 5
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  //////////////////////////////////////////////////////
  // LOADING FIX (IMPORTANT)
  //////////////////////////////////////////////////////

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // TOAST
  //////////////////////////////////////////////////////

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!session) {
      showToast("Please login first", "error");
      return;
    }

    if (!form.message) {
      showToast("Please write feedback", "error");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || "Failed", "error");
        setLoading(false);
        return;
      }

      showToast("🎉 Feedback submitted!");

      setForm({
        message: "",
        rating: 5
      });

    } catch {

      showToast("Something went wrong", "error");

    }

    setLoading(false);

  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f5f2ee] to-[#fff] flex items-center justify-center px-4">

      {/* TOAST */}
      {toast && (
        <div className={`fixed top-6 right-6 px-4 py-2 rounded-lg shadow text-white z-50
          ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full items-center">

        {/* LEFT */}
        <div className="space-y-4">

          <h1 className="text-3xl font-bold text-[#3e2c23]">
            We Value Your Feedback 💛
          </h1>

          <p className="text-gray-600">
            Your experience helps us improve and serve you better.
          </p>

          <div className="bg-white p-4 rounded-lg shadow text-sm italic">
            “Dipelz feels like home-made food. Absolutely loved it!”
            <p className="mt-2 font-semibold">– Happy Customer</p>
          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >

          <h2 className="text-lg font-semibold">Share Feedback</h2>

          {/* USER INFO */}
          {session ? (
            <div className="bg-gray-50 p-3 rounded-lg border text-sm">
              <p className="font-medium">{session.user.name}</p>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
          ) : (
            <p className="text-red-500 text-sm">
              Please login to submit feedback
            </p>
          )}

          <textarea
            placeholder="Write your feedback..."
            value={form.message}
            onChange={(e)=>setForm({...form, message:e.target.value})}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#8b2e1f] outline-none"
          />

          {/* STARS */}
          <div className="flex gap-2 text-xl">

            {[1,2,3,4,5].map(star => (

              <span
                key={star}
                onClick={() => setForm({...form, rating: star})}
                className={`cursor-pointer transition ${
                  star <= form.rating ? "text-yellow-500 scale-110" : "text-gray-300"
                }`}
              >
                ★
              </span>

            ))}

          </div>

          <button
            disabled={loading || !session}
            className="w-full bg-[#8b2e1f] text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

        </form>

      </div>

    </div>

  );

}