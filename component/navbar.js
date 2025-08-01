"use client";
import { FaEquals } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="flex justify-between items-center bg-black h-[50px] px-5">
        <p className="text-green-400 font-bold text-2xl">EatwithMe</p>

        <ul className="hidden md:flex gap-10 font-semibold cursor-pointer text-green-400">
          <Link href="/dashboard/african"><li>African</li></Link>
          <Link href="/dashboard/inter"><li>Intercontinental</li></Link>
          <Link href="/dashboard/chop"><li>Smallchops</li></Link>
        </ul>

        <p className="hidden md:block text-green-400">LOGIN</p>

        <div className="md:hidden">
          <FaEquals
            className="text-2xl text-green-400 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black text-green-400 px-5 py-4 space-y-4">
          <Link href="/dashboard/african"><p>African</p></Link>
          <Link href="/dashboard/inter"><p>Intercontinental</p></Link>
          <Link href="/dashboard/chop"><p>Smallchops</p></Link>
          <Link href="/login"><p>Login</p></Link>
        </div>
      )}
    </>
  );
}
