"use client";
import { useState } from "react";
import Image from "next/image";

const meals = [
  {
    id: 1,
    name: "Boiled Plantain with Local Sauce",
    price: 5000,
    image: "/african3.jpg",
  },
  {
    id: 2,
    name: "Coconut Rice and Beef",
    price: 7000,
    image: "/african5.jpg",
  },
  {
    id: 3,
    name: "Spaghetti / Fish / Boiled Egg",
    price: 4500,
    image: "/african4.jpg",
  },
  {
    id: 4,
    name: "Turkey / Jollof Rice / Plantain",
    price: 6500,
    image: "/african10.jpg",
  },
  {
    id: 5,
    name: "Local Sauce / White Rice / Egg",
    price: 8500,
    image: "/african8.jpg",
  },
  {
    id: 6,
    name: "Jollof Rice / Turkey and Corn",
    price: 5500,
    image: "/african9.jpg",
  },
];

export default function African() {
  const [cart, setCart] = useState([]);

  const addToCart = (meal) => {
    const exists = cart.find((item) => item.id === meal.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  };

  const increase = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const remove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <main className="bg-yellow-50 min-h-screen p-6">
      <h1 className="text-3xl text-green-700 font-bold text-center mb-6">
        African Dishes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="bg-yellow-100 border border-gray-200 shadow-md rounded p-4 flex flex-col items-center"
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
                onClick={() => addToCart(meal)}
                className="bg-yellow-300 hover:bg-yellow-400 px-4 py-1 rounded text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

    
      {cart.length > 0 && (
        <div className="bg-white mt-10 p-6 rounded shadow max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-green-700">Cart</h2>
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
        </div>
      )}
    </main>
  );
}
