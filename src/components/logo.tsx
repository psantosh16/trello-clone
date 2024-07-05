import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="font-bold md:text-xl flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="Trello"
        width={40}
        height={40}
        loading="lazy"
        className="w-6 h-6 cursor-pointer select-none pointer-events-none"
      />
      Tasuku
    </Link>
  );
};

export default Logo;
