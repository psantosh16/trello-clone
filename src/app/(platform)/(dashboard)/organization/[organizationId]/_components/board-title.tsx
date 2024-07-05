"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const BoardTitle = ({ title, id }: { title: string; id: string }) => {
  const [isPending, setIsPending] = useState(false);

  function onDelete({ id }: { id: string }) {
    setIsPending(true);
    deleteBoard({ id: id });
    setTimeout(() => {
      setIsPending(false);
    }, 3500);
  }

  return (
    <div className="flex gap-x-2 items-center">
      <h1>Board Title: {title}</h1>
      <Button
        variant="destructive"
        size="sm"
        className={cn("", isPending ? " cursor-not-allowed opacity-50" : "")}
        onClick={() => {
          onDelete({ id });
        }}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};
