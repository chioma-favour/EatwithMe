"use client";

import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order has been received. We'll contact you shortly.
      </p>

      <Link href="/">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-lg">
          Back to Home
        </button>
      </Link>
    </main>
  );
}
