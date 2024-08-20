
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our App!</h1>
        <p className="text-lg mb-6">Please choose an action below:</p>
        <div className="flex flex-col gap-4">

          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
            Login
          </Link>
          <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
            Register
          </Link>
        </div>
      </div>
    </div>


  );
}
