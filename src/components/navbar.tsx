import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="max-w-full bg-slate-200/20 flex flex-row justify-between p-4 text-black border border-b">
      <Link href="/" className="font-bold md:text-xl flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Trello"
          width={40}
          height={40}
          loading="lazy"
          className="w-6 h-6 cursor-pointer select-none pointer-events-none"
        />{" "}
        Tasuku
      </Link>
      <Button size="sm" asChild variant="default">
        <Link href="/login">Login</Link>
      </Button>
    </nav>
  );
}
