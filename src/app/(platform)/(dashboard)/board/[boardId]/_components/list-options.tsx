"use client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "../../../../../../../prisma/generated/client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const formReef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Popover>
      <PopoverTrigger>
        <Button asChild className="size-auto p-2" variant="ghost">
          <MoreHorizontal className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List Options
        </div>
        <PopoverClose>
          <Button
            variant="ghost"
            className="size-auto p-2 absolute top-2 right-2  text-neutral-600"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <Button
          className="w-full rounded-none h-auto px-5 justify-start text-left text-sm font-medium text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
          onClick={onAddCard}
          variant="ghost"
        >
          Add Card...
        </Button>{" "}
        <form className="flex-1 px-[2px]">
          <input name="id" id="id" hidden value={data.id} />
          <input name="boardId" id="boardId" hidden value={data.boardId} />
          <Button
            type="submit"
            className="w-full rounded-none h-auto px-5 justify-start text-left text-sm font-medium text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
            onClick={onAddCard}
            // disabled={isLoading}
            variant="ghost"
          >
            Copy List...
          </Button>
        </form>
        <Separator />
        <form className="flex-1 px-[2px]">
          <input name="id" id="id" hidden value={data.id} />
          <input name="boardId" id="boardId" hidden value={data.boardId} />
          <Button
            type="submit"
            className="w-full rounded-none h-auto px-5 justify-start text-left text-sm font-medium text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
            onClick={onAddCard}
            // disabled={isLoading}
            variant="ghost"
          >
            Delete this List...
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
