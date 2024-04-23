import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const cookie = cookies();
  let userMail=cookie.get('email')?.value
  if (!userMail) {
    redirect('/login');
  }
  return (
    <div className="bg-gradient-to-br from-purple-400 to-pink-600 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-12 py-8 max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg text-gray-700 leading-relaxed">Explore our website to discover amazing content and features.</p>
        {!userMail ? <Link href="/login" className="mt-4 flex w-40 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700">Get Started <ArrowRight /></Link>
        : <span className="font-bold">{userMail}</span>}
      </div>
    </div>
  )
}
