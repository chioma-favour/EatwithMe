import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard/profile"); // Redirect if already signed in
  }

  return (
    <main className="min-h-[520px] flex justify-center bg-gray-50 py-8 px-2">
      <article>
        <div className="w-full md:w-[30em] rounded-md bg-white p-6 shadow-md">
          <h1 className="text-xl font-bold mb-3">Sign in to EatwithMe</h1>
          <p className="mb-4 text-sm text-gray-700">Sign in using your Google account</p>

          <form
            action={async () => {
              "use server";
              await signIn("google", { callbackUrl: "/dashboard/profile" });  // Added callbackUrl here
            }}
            className="mb-4"
          >
            <button className="w-full h-[3.2em] bg-black border-b-2 border-green-500 rounded-md flex justify-center items-center gap-2 hover:bg-gray-900 transition shadow-lg animate-bounce">
              <FaGoogle className="text-2xl text-white" />
              <span className="text-white text-lg">Sign in with Google</span>
            </button>
          </form>

          <p className="text-gray-600 text-xs text-center">
            By clicking the sign-in button, you confirm that you agree to our{" "}
            <Link href="#" className="text-gray-800 underline">Terms of Use</Link>{" "}
            and{" "}
            <Link href="#" className="text-gray-800 underline">Privacy Policy</Link>.
          </p>
        </div>
      </article>
    </main>
  );
}
