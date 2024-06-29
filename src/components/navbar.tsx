import Link from "next/link";

export default function Navbar() {
  return (
    <div className="max-w-full bg-blue-600 flex flex-row justify-between p-4 text-white">
      <Link href="/" className="font-bold text-xl">
        Trello
      </Link>
      <Link href="/login">Login</Link>
    </div>
  );
}
