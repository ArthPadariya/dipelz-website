"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    stock: "",
    description: "",
    category: "",
    bestSeller: false,
    image: "",
  });

  const fetchProducts = async () => {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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
      }

      setLoadingImage(false);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      price,
      oldPrice,
      stock,
      description,
      category,
      bestSeller,
      image,
    } = form;

    if (!name || !price || !stock || !image) {
      alert("Name, Price, Stock and Image required");
      return;
    }

    setSubmitting(true);

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
        oldPrice: oldPrice ? Number(oldPrice) : null,
        stock: Number(stock),
        description,
        category,
        bestSeller,
        images: [image],
      }),
    });

    setForm({
      name: "",
      price: "",
      oldPrice: "",
      stock: "",
      description: "",
      category: "",
      bestSeller: false,
      image: "",
    });

    fetchProducts();
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Products Management</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-12">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-3 w-full" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-3 w-full" />
        <input name="category" placeholder="Category (Combo / Breakfast / Rice / MainCourse)" value={form.category} onChange={handleChange} className="border p-3 w-full" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-3 w-full" />
        <input name="oldPrice" type="number" placeholder="Old Price" value={form.oldPrice} onChange={handleChange} className="border p-3 w-full" />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-3 w-full" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="bestSeller" checked={form.bestSeller} onChange={handleChange} />
          Best Seller
        </label>

        <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-3 w-full" />

        <button type="submit" disabled={loadingImage || submitting} className="bg-black text-white px-6 py-3">
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-3">
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  className="w-16 h-16 object-cover"
                  alt={product.name}
                />
              </td>
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.category}</td>
              <td className="p-3">₹{product.price}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3 flex gap-2">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="bg-blue-500 text-white px-3 py-1"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}