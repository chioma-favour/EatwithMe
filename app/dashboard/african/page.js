"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useCart } from "@/context/cartContext";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";  
import Link from "next/link";


export default function African() {
  const [showTraySummary, setShowTraySummary] = useState(false);
  const { cart, addToCart, increase, decrease, remove, clearCart } = useCart();

  const meals = [
    { id: 1, name: "Boiled Plantain with Local Sauce", price: 5000, image: "/african3.jpg" },
    { id: 2, name: "Coconut Rice and Beef", price: 7000, image: "/african5.jpg" },
    { id: 3, name: "Spaghetti / Fish / Boiled Egg", price: 4500, image: "/african4.jpg" },
    { id: 4, name: "Turkey / Jollof Rice / Plantain", price: 6500, image: "/african10.jpg" },
    { id: 5, name: "Local Sauce / White Rice / Egg", price: 8500, image: "/african8.jpg" },
    { id: 6, name: "Jollof Rice / Turkey and Corn", price: 5500, image: "/african9.jpg" },
  ];

  const handleAddToCart = (meal) => {
    addToCart({ ...meal, quantity: 1 });
    setShowTraySummary(true);
    toast.success(`${meal.name} added to Tray`);
  };

  const closeTraySummary = () => {
    setShowTraySummary(false);
  };

  const submitTray = async () => {
    if (cart.length === 0) {
      toast.error("Your tray is empty!");
      return;
    }

    try {
      await addDoc(collection(db, "africanOrders"), {
        items: cart,
        timestamp: new Date(),
      });

      toast.success("TRAY RECEVIED! WAIT FOR A WHILE...OR CALL US:07081843329");
      clearCart();
      closeTraySummary();
    } catch (error) {
      console.error("Error submitting tray:", error);
      toast.error("Failed to submit tray.");
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main className="bg-yellow-50 min-h-screen p-6">
      <h1 className="text-3xl text-green-700 font-bold text-center mb-6">
        African Dishes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-yellow-100 shadow-md rounded p-4 flex flex-col items-center"
          >
            <Image
              src={meal.image}
              alt={meal.name}
              width={250}
              height={300}
              className="rounded mb-4 object-cover"
            />
            <div className="text-center text-green-700">
              <p className="font-semibold">{meal.name}</p>
              <p className="mb-2">N{meal.price.toLocaleString()}</p>
              <button
                onClick={() => handleAddToCart(meal)}
                className="bg-yellow-300 hover:bg-yellow-400 px-4 py-1 rounded text-sm shadow-lg animate-bounce"
              >
                ADD TO TRAY
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tray Summary Popup */}
      {showTraySummary && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={closeTraySummary}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-green-700">Tray Summary</h2>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500">Your tray is empty</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center text-gray-800 border-b pb-2"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          N{item.price.toLocaleString()} x {item.quantity} = N
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => increase(item.id)}
                          className="bg-green-200 px-2 rounded text-sm"
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => decrease(item.id)}
                          className="bg-yellow-200 px-2 rounded text-sm"
                        >
                          -
                        </button>
                        <button
                          onClick={() => remove(item.id)}
                          className="bg-red-200 px-2 rounded text-sm text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-lg font-bold text-green-700">
                    Total: N{totalPrice.toLocaleString()}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={submitTray}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-lg"
                  >
                    Submit Tray
                  </button>
                  <button
                    onClick={() => {
                      closeTraySummary();
                      window.location.href = "/cart";
                    }}
                    className="ml-4 text-green-700 underline text-sm"
                  >
                    Go to Cart Page
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
          <Link
              href="https://wa.me/2347081843329" // <-- Change this to your WhatsApp number
              target="_blank"
              className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
            >
              <FaWhatsapp className="text-3xl" />
            
            </Link>
    </main>
  );
}
