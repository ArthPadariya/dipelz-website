"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product }) {
  const router = useRouter();
  const [loadingImage, setLoadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: product.name || "",
    slug: product.slug || "",
    description: product.description || "",
    price: product.price || 0,
    oldPrice: product.oldPrice || "",
    stock: product.stock || 0,
    category: product.category || "",
    bestSeller: product.bestSeller || false,
    image: product.images?.[0] || "",
  });

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImage(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      });

      const data = await res.json();

      if (data.url) {
        setForm((prev) => ({
          ...prev,
          image: data.url,
        }));
      } else {
        alert("Image upload failed");
      }

      setLoadingImage(false);
    };
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        slug: form.slug,
        description: form.description,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        stock: Number(form.stock),
        category: form.category,
        bestSeller: form.bestSeller,
        images: [form.image], // important
      }),
    });

    setSubmitting(false);
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border p-3 rounded"
      />

      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full border p-3 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-3 rounded"
      />

      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-3 rounded"
      />

      <input
        name="oldPrice"
        type="number"
        value={form.oldPrice}
        onChange={handleChange}
        placeholder="Old Price"
        className="w-full border p-3 rounded"
      />

      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full border p-3 rounded"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="">Select Category</option>
        <option value="Combo">Combo</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Rice">Rice</option>
        <option value="MainCourse">MainCourse</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="bestSeller"
          checked={form.bestSeller}
          onChange={handleChange}
        />
        Mark as Best Seller
      </label>

      {/* CURRENT IMAGE PREVIEW */}
      {form.image && (
        <div>
          <p className="text-sm mb-2">Current Image:</p>
          <img
            src={form.image}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}

      {/* CHANGE IMAGE BUTTON */}
      <div>
        <label className="block mb-2 font-medium">
          Change Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border p-3 rounded"
        />

        {loadingImage && (
          <p className="text-sm text-gray-500">
            Uploading new image...
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        {submitting ? "Updating..." : "Update Product"}
      </button>

    </form>
  );
}