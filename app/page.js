"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Landing() {
  const [cart, setCart] = useState([]);

  const drinks = [
    {
      id: 1,
      name: "Freshly squeezed juice",
      price: 10000,
      image: "/drink3.jpg",
    },
    {
      id: 2,
      name: "Freshly squeezed juice",
      price: 5000,
      image: "/drink2.jpg",
    },
    {
      id: 3,
      name: "Coke",
      price: 3000,
      image: "/drink.jpg",
    },
  ];

  const addToCart = (drink) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === drink.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...drink, quantity: 1 }];
      }
    });
    alert(`${drink.name} successfully added `);
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="bg-gray-100 min-h-screen py-10 px-5">
      <div className="h-64 w-full bg-[url('/food.avif')] bg-cover bg-center rounded-lg mb-10" />

      <h1 className="text-green-600 text-3xl font-bold mb-6 text-center">
        Drinks and Prices
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
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
            <div className="text-center">
              <p className="text-green-600 font-semibold">{drink.name}</p>
              <p className="text-gray-700">N{drink.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart(drink)}
                className="mt-2 bg-green-200 hover:bg-green-300 text-green-700 py-1 px-3 rounded text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-green-600">Cart</h2>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
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
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-green-200 px-2 rounded"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-yellow-200 px-2 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-200 px-2 text-red-700 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
