import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

if (
  !process.env.AUTH_FIREBASE_PROJECT_ID ||
  !process.env.AUTH_FIREBASE_CLIENT_EMAIL ||
  !process.env.AUTH_FIREBASE_PRIVATE_KEY
) {
  throw new Error("Missing Firebase service account environment variables.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  }),
  pages: {
    signIn: "/auth/signin",
    signOut:"/dashboard/profile"
    
  },
  callbacks: {
    session: ({ session }) => {
      return session;
    },
  },
});
