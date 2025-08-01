"use client";

import Image from "next/image";
import { useState } from "react";

export default function Inter() {
  const [cart, setCart] = useState([]);

  const foodItems = [
    {
      id: 1,
      name: "chicken/chips/milk",
      price: 25000,
      image: "/chop3.jpg",
    },
    {
      id: 2,
      name: "hot-dog/mustard ketchup",
      price: 8000,
      image: "/chop5.jpg",
    },
    {
      id: 3,
      name: "spicy fried chicken",
      price: 10000,
      image: "/chop4.jpg",
    },
    {
      id: 4,
      name: "cripsy potatoes/ketchup",
      price: 8500,
      image: "/chop1.jpg",
    },
    {
      id: 5,
      name: "cripsy fried chicken",
      price: 12000,
      image: "/chop2.jpg",
    },
    {
      id: 6,
      name: "spicy shawarma",
      price: 5500,
      image: "/chop6.jpg",
    },
  ];

  const addToCart = (food) => {
    setCart((prevCart) => {
      const foodAdded= prevCart.find((item) => item.id === food.id);

      if (foodAdded) {
        return prevCart.map((item) =>
          item.id === food.id
            ?{ ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });

    alert(`${food.name} successfully added to cart`);
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
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="bg-yellow-50 min-h-screen p-5">
      <h1 className="text-3xl text-green-700 font-bold text-center mb-6 ">Small chops</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5 px-4">
        {foodItems.map((food) => (
          <div
            key={food.id}
            className="bg-yellow-100 border border-gray-200 shadow-md rounded p-4 flex flex-col items-center"
          >
            <Image
              src={food.image}
              alt={food.name}
              width={300}
              height={150}
              className="h-[300px] w-[250px] object-cover mx-auto"
            />
            <div className="text-green-400 text-center mt-3">
              <p className="font-semibold">{food.name}</p>
              <p className="mb-2">N{food.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart(food)}
                className="bg-yellow-200 hover:bg-yellow-300 text-green-600 font-medium py-1 px-3 rounded-sm"
              >
                Add to Food
              </button>
            </div>
          </div>
        ))}
      </div>

    
      {cart.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-green-600">Cart</h2>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-gray-800"
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
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-green-200 px-2 rounded text-sm"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-yellow-200 px-2 rounded text-sm"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-200 px-2 rounded text-sm text-red-700"
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
