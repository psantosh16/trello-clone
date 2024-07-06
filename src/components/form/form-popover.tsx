"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import BoardCreationForm from "@/app/(platform)/(dashboard)/organization/[organizationId]/_components/create-board-form";
import { useAction } from "@/hooks/useAction";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align = "center",
  sideOffset = 10,
}: FormPopoverProps) => {


  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create New Board
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="w-auto h-auto absolute top-2 right-2 text-neutral-600"
          >
            <X className="size-4" />
          </Button>
        </PopoverClose>
        <BoardCreationForm />
      </PopoverContent>
    </Popover>
  );
};
