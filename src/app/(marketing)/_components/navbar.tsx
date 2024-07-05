import Link from "next/link";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import Logo from "@/components/logo";

export default function Navbar() {
  return (
    <nav className="max-w-full bg-white flex flex-row justify-between p-4 text-black border border-b fixed w-full top-0">
      <Logo />
      <div className="flex gap-2">
        <Button size="sm" asChild variant="outline">
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/sign-up">Get Now</Link>
        </Button>
      </div>
    </nav>
  );
}
