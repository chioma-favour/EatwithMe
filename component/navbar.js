"use client";

import { IoFileTrayStackedSharp } from "react-icons/io5";
import { useState } from "react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const { cart } = useCart();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-black h-[50px] px-5">
        <p className="text-green-400 font-bold text-2xl hover:animate-bounce">EatwithMe</p>

        {/* Desktop Menu */}
        <ul className="cursor-pointer hidden md:flex gap-10 font-semibold text-green-400">
          <Link href="/dashboard/african"><li className="hover:animate-bounce">AFRICAN</li></Link>
          <Link href="/dashboard/inter"><li className="hover:animate-bounce">INTERCONTINENTAL</li></Link>
          <Link href="/dashboard/chop"><li className="hover:animate-bounce">PASTRIES</li></Link>
          <Link href="/dashboard/profile"><li className="hover:animate-bounce">LOG-OUT</li></Link>
           <Link href="/auth/signin"><li className="hover:animate-bounce">LOG-IN</li></Link> 

          {/* Cart Icon */}
          <li className="relative cursor-pointer" onClick={() => setCartPopupOpen(!cartPopupOpen)}>
            <IoFileTrayStackedSharp className="text-2xl hover:animate-bounce" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </li>
        </ul>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <IoFileTrayStackedSharp
            className="text-2xl text-green-400 cursor-pointer hover:animate-bounce"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {/* Cart Popup */}
      {cartPopupOpen && (
        <div className="absolute right-5 top-14 bg-white shadow-md rounded p-4 w-72 z-50">
          <h2 className="font-bold mb-2">WHAT YOU HAVE IN YOUR TRAY</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <p>{item.name}</p>
                  <p>x{item.quantity}</p>
                </div>
              ))}
              <Link href="/cart">
                <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded w-full">
                  find more food
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-green-400 flex flex-col items-center py-4 space-y-4 absolute top-12 left-0 right-0 z-40 animate-slide-down">
          <Link href="/dashboard/african" onClick={() => setMenuOpen(false)}>AFRICAN</Link>
          <Link href="/dashboard/inter" onClick={() => setMenuOpen(false)}>INTERCONTINENTAL</Link>
          <Link href="/dashboard/chop" onClick={() => setMenuOpen(false)}>PASTRIES</Link>
          <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}>LOG-OUT</Link>
          <Link href="/auth/signin" onClick={() => setMenuOpen(false)}>LOGIN</Link>
        </div>
      )}

      {/* WhatsApp Sticky Icon */}
      <a
        href="https://wa.me/2347081843329"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-green-500 p-3 rounded-full shadow-lg animate-bounce"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </a>
    </div>
  );
}
