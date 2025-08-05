"use client";

import { useCart } from "@/context/cartContext";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PaymentPage() {
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayNow = () => {
    if (cart.length === 0) {
      toast.error("Your tray is empty!");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const totalAmount = calculateTotal();
    const accountNumber = "7081843329"; 
    const bankName = "OPAY";

  
    const orderDetails = cart
      .map(
        (item) =>
          `• ${item.name} x ${item.quantity} = N${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const message = `Hello EatWithMe,

I'd like to place an order with the following details:

Customer Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location}

Order Details:
${orderDetails}

Total Amount: N${totalAmount.toLocaleString()}

   COMPANPY'S POLICY
Bank Details:
Account Number: ${accountNumber}
Bank Name: ${bankName}
Account Name: OKOLI CHIOMA FAVOUR

 you will attach the payment proof image after this message.
 Have a nice day.
 Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/2347081843329?text=${encodedMessage}`;

    clearCart(); 
    window.location.href = whatsappLink; 
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        Payment Instructions
      </h1>

      <div className="bg-white rounded shadow p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Customer Details</h2>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            className="w-full border p-2 rounded mb-3"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Delivery Location"
            className="w-full border p-2 rounded mb-3"
          />
        </div>

        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your tray is empty.</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>N{(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="text-right font-semibold text-lg mb-4">
          Total: N{calculateTotal().toLocaleString()}
        </div>

        <div className="bg-yellow-100 p-4 rounded mb-4">
          <p className="font-bold mb-2">Bank Details:</p>
          <p>Account Number: <span className="font-mono">7081843329</span></p>
          <p>Bank: OPAY</p>
          <p className="mt-2 text-sm text-gray-600">
            After payment,you should attach payment proof in the WhatsApp chat.
          </p>
        </div>

        <button
          onClick={handlePayNow}
          className="w-full bg-green-600 hover:bg-green-600 text-white py-2 rounded text-lg shadow-lg animate-bounce"
        >
          Submit Order & Go to WhatsApp
        </button>
      </div>
    </main>
  );
}
