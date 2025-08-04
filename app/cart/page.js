"use client";

import { useCart } from "@/context/cartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, increase, decrease, remove } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Your tray is empty.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Your Tray</h1>

      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
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

        <div className="mt-6 text-right text-lg font-bold">
          Total: N{calculateTotal().toLocaleString()}
        </div>

        <div className="mt-6 text-center">
          <Link href="/dashboard/payment">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-lg">
              Proceed to Payment
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
