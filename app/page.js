"use client";

import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { toast } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";  // Import WhatsApp Icon
import Link from "next/link"; // For linking to WhatsApp URL

export default function Drinks() {
  const { addToCart } = useCart();

  const drinks = [
    { id: 1, name: "Freshly squeezed juice", price: 10000, image: "/drink3.jpg" },
    { id: 2, name: "Freshly squeezed juice", price: 5000, image: "/drink2.jpg" },
    { id: 3, name: "Coke", price: 3000, image: "/drink.jpg" },
  ];

  const handleAddToTray = (drink) => {
    addToCart({ ...drink, quantity: 1 });
    toast.success(`${drink.name} added to Tray`);
  };

  return (
    <main className="bg-gray-100 min-h-screen py-10 px-5 relative">
      {/* Background Image */}
      <div className="h-64 w-full bg-[url('/food.avif')] bg-cover bg-center rounded-lg mb-10" />

      <h1 className="text-green-600 text-3xl font-bold mb-6 text-center">
        Drinks and Prices
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {drinks.map((drink) => (
          <div
            key={drink.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <Image
              width={300}
              height={200}
              src={drink.image}
              alt={drink.name}
              className="rounded-lg object-cover mb-3"
            />
            <p className="text-green-600 font-semibold">{drink.name}</p>
            <p className="text-gray-700">N{drink.price.toLocaleString()}</p>
            <button
              onClick={() => handleAddToTray(drink)}
              className="mt-2 bg-green-200 hover:bg-green-300 text-green-700 py-1 px-3 rounded text-sm shadow-lg animate-bounce"
            >
              Add to Tray
            </button>
          </div>
        ))}
      </div>

      
      <Link
        href="https://wa.me/2347081843329"
        target="_blank"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center animatednimate-bounce"
      >
        <FaWhatsapp className="text-3xl" />
        
      </Link>
    </main>
  );
}

