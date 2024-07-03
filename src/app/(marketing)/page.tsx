import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

export default function MarketingPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center flex-col items-center">
        <div className="items-center shadow-sm p-3 md:p-4 bg-amber-100 text-amber-700 rounded-full flex border mb-4 gap-2 uppercase font-bold text-sm md:text-xl">
          <Medal />
          No 1 Task Management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-2 font-bold">
          This helps teams move
        </h1>
        <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white p-2 px-4  w-fit rounded-md  cursor-pointer text-3xl md:text-6xl font-bold">
          work forward
        </div>
      </div>
      <p className="text-neutral-400 max-w-sm text-center mt-4 md:max-w-xl text-sm md:text-xl mx-auto">
        Collaborate with your team, track progress, and move work forward—all in
        one place. Get started today. It's free!, A better way to work together.
      </p>
      <Button size="lg" className="mt-6" asChild>
        <Link href="/login">Get it for Free</Link>
      </Button>
    </div>
  );
}
