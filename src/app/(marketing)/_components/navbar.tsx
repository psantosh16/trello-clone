import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Logo from "@/components/logo";
import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="max-w-full bg-white flex flex-row justify-between p-4 text-black border border-b fixed w-full top-0">
      <Logo />
      <div className="flex gap-2 items-center">
        <Button size="sm" asChild variant="outline">
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/sign-up">Get Now</Link>
        </Button>
        <Button
          size="icon"
          asChild
          className="ml-2 rounded-full p-1 size-[2rem] text-black border-2 border-black hover:bg-black hover:text-white ease-in-out transition-all"
          variant="ghost"
        >
          <Link
            href="https://github.com/psantosh16/tasakus.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
