import Link from "next/link";
import { db } from "@/lib/db";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FormPopover } from "@/components/form/form-popover";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700 ">
        <User className="size-6 mr-2" />
        Board List
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover sideOffset={10} align="center" side="right">
          <Card
            role="button"
            className="aspect-video relative h-full w-full bg-muted flex justify-center items-center gap-y-1 hover:opacity-75 transition-opacity"
          >
            <p className="text-sm">Create New Board</p>
          </Card>
        </FormPopover>
        {boards.map((b) => {
          return (
            <Link href={`/organization/${b.orgId}/board/${b.id}`} key={b.id}>
              <div
                className="  overflow-clip aspect-video relative h-full w-full bg-muted bg-center bg-no-repeat bg-cover flex justify-center items-center gap-y-1 hover:opacity-75 transition-opacity rounded-sm"
                style={{
                  backgroundImage: `url(${b.imageThumbUrl.toString()})`,
                }}
              >
                <p className="text-lg absolut top-0 left-0 pl-2 pt-1 text-white font-semibold h-full w-full bg-black/30 group-hover:bg-black/40 ">
                  {b.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700 ">
        <User className="size-6 mr-2" />
        Board List
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="aspect-video relative h-full w-full bg-muted flex justify-center items-center gap-y-1 hover:opacity-75 transition-opacity">
          <Skeleton className="w-full h-full" />
        </Card>
        <Card className="aspect-video relative h-full w-full bg-muted flex justify-center items-center gap-y-1 hover:opacity-75 transition-opacity">
          <Skeleton className="w-full h-full" />
        </Card>
        <Card className="aspect-video relative h-full w-full bg-muted flex justify-center items-center gap-y-1 hover:opacity-75 transition-opacity">
          <Skeleton className="w-full h-full" />
        </Card>
        <Card className="aspect-video relative h-full w-full bg-muted flex justify-center items-center gap-y-1 hover:opacity-75 transition-opacity">
          <Skeleton className="w-full h-full" />
        </Card>
      </div>
    </div>
  );
};
