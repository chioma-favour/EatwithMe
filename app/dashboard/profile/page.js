"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";  
export default function Profile() {
  const { data: session, status } = useSession();  

  if (status === "loading") {
    return <p>Loading profile...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="mb-4">
        <strong>Name:</strong> {session.user.name}
      </p>
      <p className="mb-4">
        <strong>Email:</strong> {session.user.email}
      </p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow-lg animate-bounce"
      >
        Sign Out
      </button>
         <Link
                    href="https://wa.me/2347081843329" // <-- Change this to your WhatsApp number
                    target="_blank"
                    className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center "
                  >
                    <FaWhatsapp className="text-3xl" />
                  </Link>
    </div>
    
  );
}
