"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Chop() {
  const [cart, setCart] = useState([]);

  const foodItems = [
    {
      id: 1,
      name: "collard greens",
      price: 5000,
      image: "/inter3.jpg",
    },
    {
      id: 2,
      name: "Cornbread base",
      price: 7000,
      image: "/inter5.jpg",
    },
    {
      id: 3,
      name: "candied yam",
      price: 4500,
      image: "/inter4.jpg",
    },
    {
      id: 4,
      name: "beef and collard greens",
      price: 6500,
      image: "/inter1.jpg",
    },
    {
      id: 5,
      name: "macaroni and cheese",
      price: 8500,
      image: "/inter2.jpg",
    },
    {
      id: 6,
      name: "dounut and cream",
      price: 5500,
      image: "/inter7.jpg",
    },
  ];

  const addTofood = (food) => {
    setCart((prevCart) => {
    const existingitem=prevCart.find((item)=> item.id === food.id);
    
     if (existingitem){
      return prevCart.map((item)=>
      item.id ===food.id
      ?{...prevCart,food,quantity:food.quantity + 1 }:food
      );

      } else {
        return[...prevCart,{...food,quantity:1}]
      }
    
  
  });
    alert(`${food.name} successfully added to cart!`);
  };
  const increaseQuantity=(id) =>{
    setCart((prev) =>
    prev.map((food) =>
    food.id === id ? {...food,quantity:food.quantity +1}:food
  
  )
    );
  };
  const decreaseQuantity=(id)=>{
    setCart((prev)=>
    prev.map((food)=>
    food.id === id ? {...food,quantity:food.quantity >1? food.quantity -1 :1}:food
    )
    );
  };
  const removeQuantity=(id)=>{
setCart((prev)=>prev.filter((food)=>food.id !==id));
  };

  return (
    <main className="bg-yellow-50 min-h-screen p-5">
      <h1 className="text-3xl text-green-700 font-bold text-center mb-6">Intercontinetal Dishes</h1>
      <div className="grid grid-cols-1 sm: grid-grid-cols-2 md:grid-cols-3 gap-5 px-4">
        {foodItems.map((food) => (
          <div key={food.id} className="border bg-yellow-100 rounded-sm shadow w-[320px] h-[420px] p-4 mx-auto">
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
                onClick={() => addTofood(food)}
                className="bg-yellow-200 hover:bg-yellow-300 text-green-600 font-medium py-1 px-3 rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))};
      </div>
        {cart.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-green-600">Cart</h2>
          <ul className="space-y-4">
            {cart.map((food) => (
              <li
                key={food.id}
                className="flex justify-between items-center text-gray-800"
              >
                <div>
                  <p className="font-semibold">{food.name}</p>
                  <p className="text-sm text-gray-500">
                  N{food.price.toLocaleString()} x {food.quantity} = N
                    {(food.price * food.quantity).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => increaseQuantity(food.id)}
                    className="bg-green-200 px-2 rounded text-sm"
                  >
                    +
                  </button>
                  <span>{food.quantity}</span>
                  <button
                    onClick={() => decreaseQuantity(food.id)}
                    className="bg-yellow-200 px-2 rounded text-sm"
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeQuantity(food.id)}
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
