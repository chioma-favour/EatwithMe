import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function Authorizationcheck(){
   const session = await auth();
   // redirect to signin page if the user is not signged in
   if (!session?.user){
    redirect("/auth/signin");
   }
}