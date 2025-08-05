"use client";

import { IoFileTrayStackedSharp } from "react-icons/io5";
import { useState } from "react";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const { cart } = useCart();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      {/* NAVBAR TOP */}
      <div className="flex justify-between items-center bg-black h-[50px] px-5">
        <p className="text-green-400 font-bold text-2xl">EatwithMe</p>

        {/* Desktop Menu */}
        <ul className="cursor-pointer hidden md:flex gap-10 font-semibold text-green-400">
          <Link href="/dashboard/african"><li>AFRICAN</li></Link>
          <Link href="/dashboard/inter"><li>INTERCONTINENTAL</li></Link>
          <Link href="/dashboard/chop"><li>PASTRIES</li></Link>
          <Link href="/dashboard/profile"><li>SIGNOUT</li></Link>
          <Link href="/auth/signin"><li>SIGNIN</li></Link>
          
          {/* Cart Icon */}
          <li className="relative cursor-pointer" onClick={() => setCartPopupOpen(!cartPopupOpen)}>
            <IoFileTrayStackedSharp className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex gap-4">
          <div className="relative cursor-pointer" onClick={() => setCartPopupOpen(!cartPopupOpen)}>
            <IoFileTrayStackedSharp className="text-2xl text-green-400" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

          <IoFileTrayStackedSharp
            className="text-2xl text-green-400 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {/* Cart Popup (Responsive) */}
      {cartPopupOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-5 top-14 bg-white shadow-md rounded p-4 w-72 z-50"
        >
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
                  Find More Food
                </button>
              </Link>
            </div>
          )}
        </motion.div>
      )}

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="md:hidden absolute top-[50px] left-0 w-full bg-black text-green-400 py-4 flex flex-col gap-4 items-center z-50"
        >
          <Link href="/dashboard/african" onClick={() => setMenuOpen(false)}><p>AFRICAN</p></Link>
          <Link href="/dashboard/inter" onClick={() => setMenuOpen(false)}><p>INTERCONTINENTAL</p></Link>
          <Link href="/dashboard/chop" onClick={() => setMenuOpen(false)}><p>PASTRIES</p></Link>
          <Link href="/dashboard/profile" onClick={() => setMenuOpen(false)}><p>SIGNOUT</p></Link>
          <Link href="/auth/signin" onClick={() => setMenuOpen(false)}><p>SIGNIN</p></Link>
        </motion.div>
      )}
    </div>
  );
}
