"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useCart } from "@/context/cartContext";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";  
import Link from "next/link";


export default function Intercontinental() {
  const [showTraySummary, setShowTraySummary] = useState(false);
  const { cart, addToCart, increase, decrease, remove, clearCart } = useCart();

  const foodItems = [
    { id: 1, name: "Collard Greens", price: 5000, image: "/inter3.jpg" },
    { id: 2, name: "Cornbread Base", price: 7000, image: "/inter5.jpg" },
    { id: 3, name: "Candied Yam", price: 4500, image: "/inter4.jpg" },
    { id: 4, name: "Beef and Collard Greens", price: 6500, image: "/inter1.jpg" },
    { id: 5, name: "Macaroni and Cheese", price: 8500, image: "/inter2.jpg" },
    { id: 6, name: "Doughnut and Cream", price: 5500, image: "/inter7.jpg" },
  ];

  const handleAddToCart = (food) => {
    addToCart({ ...food, quantity: 1 });
    setShowTraySummary(true);
    toast.success(`${food.name} added to Tray`);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const submitTray = async () => {
    if (cart.length === 0) {
      toast.error("Your tray is empty!");
      return;
    }

    try {
      await addDoc(collection(db, "intercontinentalOrders"), {
        items: cart,
        totalAmount: calculateTotal(),
        timestamp: new Date(),
      });

      toast.success("TRAY RECEIVED! WAIT FOR A WHILE OR CALL US:07081843329");
      clearCart();
      setShowTraySummary(false);
    } catch (error) {
      console.error("Error submitting tray:", error);
      toast.error("Failed to submit tray.");
    }
  };

  const closeTraySummary = () => {
    setShowTraySummary(false);
  };

  return (
    <main className="bg-yellow-50 min-h-screen p-5">
      <h1 className="text-3xl text-green-700 font-bold text-center mb-6">
        Intercontinental Dishes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foodItems.map((food) => (
          <div
            key={food.id}
            className="bg-yellow-100 shadow-md rounded p-4 flex flex-col items-center"
          >
            <Image
              src={food.image}
              alt={food.name}
              width={250}
              height={300}
              className="rounded mb-4 object-cover"
            />
            <div className="text-center text-green-700">
              <p className="font-semibold">{food.name}</p>
              <p className="mb-2">N{food.price.toLocaleString()}</p>
              <button
                onClick={() => handleAddToCart(food)}
                className="bg-yellow-300 hover:bg-yellow-400 px-4 py-1 rounded text-sm shadow-lg animate-bounce"
              >
                ADD TO TRAY
              </button>
            </div>
          </div>
        ))}
      </div>

    
      {showTraySummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
                      <div className="flex gap-2 items-center">
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
                    Total: N{calculateTotal().toLocaleString()}
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
              href="https://wa.me/2347081843329" 
              target="_blank"
              className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center animated animate-bounce"
            >
              <FaWhatsapp className="text-3xl" />
            
            </Link>
    </main>
  );
}
