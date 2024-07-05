import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <nav className="max-w-full bg-slate-100 flex flex-row justify-between p-4 text-black border border-b fixed w-full bottom-0 items-center">
      <Link
        href="/"
        className="font-bold md:text-xl hidden items-center gap-2 md:flex"
      >
        <Image
          src="/logo.svg"
          alt="Trello"
          width={40}
          height={40}
          loading="lazy"
          className="w-4 h-4 cursor-pointer select-none pointer-events-none "
        />
        Tasuku
      </Link>
      <div className="space-x-2 md:block md:w-auto flex items-center justify-between w-full">
        <Button size="sm" variant="ghost">
          Privacy Policy
        </Button>
        <Button size="sm" variant="ghost">
          Terms of Service
        </Button>
      </div>
    </nav>
  );
};

export default Footer;
