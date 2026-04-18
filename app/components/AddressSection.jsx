"use client";

import { useState } from "react";

export default function AddressSection({ onAddressChange }) {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleChange = (e) => {

    const updated = {
      ...form,
      [e.target.name]: e.target.value
    };

    setForm(updated);

    onAddressChange(updated);

  };

  return (

    <div className="bg-white rounded-xl shadow p-6 space-y-4">

      <h3 className="font-semibold text-lg">
        Delivery Address
      </h3>

      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      />

      <textarea
        name="address"
        placeholder="Full Address"
        value={form.address}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      />

      <div className="grid grid-cols-2 gap-3">

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

      </div>

      <input
        name="pincode"
        placeholder="Pincode"
        value={form.pincode}
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      />

    </div>

  );

}