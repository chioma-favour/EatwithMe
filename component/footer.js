
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Footer () {
    return(
        
<footer className=" grid grid-cols-1 md:px-8 md:grid-cols-2 lg:grid-cols-3 lg:py-4 lg:px-2 lg:gap-0 w-full  bg-black">
<div>
    <p className="text-2xl text-green-400 font-bold">EatwithMe</p>
    <p className="text-2xl text-gray-400">Enjoy every taste </p>
</div>
<div>
    <p className="text-md text-green-700">Head Quarters</p>
    <p className="text-md text-green-700">Karu , Nyaya , Abuja</p>
</div>
<div>
<ul  className="flex lg:justify-end md:px-4 sm:px-10 item-center gap-4">
<li><Link href="#">< FaFacebookF className="text-green-400 text-2xl" /></Link></li>
<li><Link href="#">< FaXTwitter  className="text-green-400 text-2xl" /></Link></li>
<li><Link href="#">< FaInstagram className="text-green-400 text-2xl" /></Link></li>
</ul>
<ul className="flex lg:justify-end item-center gap-4">
<li><Link href="#" className="text-sm text-gray-600">Term of use</Link></li>
<li><Link href="#" className="text-sm text-gray-600">Glossary</Link></li>
<li><Link href="#" className="text-sm text-gray-600">FAQS</Link></li>
</ul>
</div>
<div className="gap-10 pt-5 px-10 cursor-pointer">
<h1 className=" border-b-3 border-gray-600">Useful</h1>
 <ul className="text-gray-600 text-sm ">
    <li className=" border-b border-gray-600">About EatwithMe</li>
    <li className=" border-b border-gray-600">call:070982758</li>
    <li className=" border-b border-gray-600">we dont do homeservice</li>
    <li className=" border-b border-gray-600">Payment before Delivries</li>
    <li className=" border-b border-gray-600">Delivries starts by 9:00am</li>
    <li className=" border-b border-gray-600">we deliver all around abuja</li>
 
 </ul>
</div>
</footer>

    )
}