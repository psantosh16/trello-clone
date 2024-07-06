import { db } from "@/lib/db";
// import BoardCreationForm from "./create-board-form";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { FormPopover } from "@/components/form/form-popover";

export const BoardList = async () => {
  // const boards = await db.board.findMany();
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700 ">
        <User className="size-6 mr-2" />
        Board List
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
        {/* <BoardCreationForm /> */}
        <FormPopover sideOffset={10} align="center" side="right">
          <Card
            role="button"
            className="aspect-video relative h-full w-full bg-muted flex justify-center items-center gap-y-1 hover:opacity-75 transition-opacity"
          >
            <p className="text-sm">Create New Board</p>
          </Card>
        </FormPopover>
        {/* {boards.map((b) => {
          return (
            <div key={b.id}>
              <p>{b.title}</p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
