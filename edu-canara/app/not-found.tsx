// pages/404.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4">
      <h1 className="text-[10rem] font-bold uppercase tracking-widest m-0">404</h1>
      <p className="text-2xl my-6 font-normal">This page does not exist.</p>
      <Link href="/">
        <p className="text-2xl font-bold bg-yellow-300 border-4 border-black px-6 py-3 transition duration-200 ease-in-out hover:bg-black hover:text-white">
          Go back to safety
        </p>
      </Link>
    </div>
  );
}
