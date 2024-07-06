"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

export const Info = () => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return (
      <div>
        <Info.Skeleton />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-x-2 items-end">
        <div className="size-[60px] relative">
          <Image
            src={organization?.imageUrl!}
            alt="Organization"
            fill
            className="rounded-md object-cover "
          />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold">{organization?.name}</h1>
      </div>
    </>
  );
};

Info.Skeleton = function InfoSkeletion() {
  return (
    <div className="flex flex-col space-y-2 w-full mb-2">
      <div className="flex gap-x-2 items-end">
        <Skeleton className="rounded-md size-[60px]" />
        <Skeleton className="w-48 h-8" />
      </div>
      {/* <div className="flex flex-col space-y-2">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div> */}
    </div>
  );
};
