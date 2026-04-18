"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f5f2ee] text-[#3e2c23] pt-16 pb-8 mt-20">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/about">About Us</Link></li>

            {/* 👇 ADDED FEEDBACK */}
            <li><Link href="/feedback">Feedback</Link></li>

            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Top Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>Best Seller</li>
            <li>Combo Packs</li>
            <li>Breakfast</li>
            <li>Main Course</li>
            <li>Jain Dishes</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Our Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/refund-policy">Refund Policy</Link></li>
            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Store Info */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Our Store</h3>
          <p className="text-sm leading-6">
            Dipelz Foods <br />
            Anand, Gujarat, India
          </p>

          <p className="mt-3 text-sm">
            +91 9512115616 <br />
            dipelzfoods@gmail.com
          </p>

          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-[#8b2e1f]" />
            <FaInstagram className="cursor-pointer hover:text-[#8b2e1f]" />
            <FaYoutube className="cursor-pointer hover:text-[#8b2e1f]" />
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">
            Over 100+ 5-Star Reviews
          </h3>

          <div className="flex -space-x-3 mb-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"></div>
            <div className="w-10 h-10 bg-gray-400 rounded-full border-2 border-white"></div>
            <div className="w-10 h-10 bg-gray-500 rounded-full border-2 border-white"></div>
          </div>

          <p className="text-sm italic">
            “Authentic taste just like home. Truly Gujarati flavors.”
          </p>

          <p className="text-sm font-semibold mt-2">
            – Happy Customer
          </p>
        </div>

      </div>

      <div className="border-t mt-12 pt-6 text-center text-sm">
        ©️ {new Date().getFullYear()} Dipelz. All Rights Reserved.
      </div>

    </footer>
  );
}