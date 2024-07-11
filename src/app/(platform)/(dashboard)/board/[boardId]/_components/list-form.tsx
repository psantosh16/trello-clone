"use client";

import { Button } from "@/components/ui/button";
import { ListWrapper } from "./list-wrapper";
import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { useAction } from "@/hooks/useAction";
import { CreateListSchema } from "@/actions/create-list/schema";
import { CreateList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(
    {
      schema: CreateListSchema,
      method: CreateList,
    },
    {
      onSuccess(data) {
        toast.success(`List "${data.title}" created.`);
        disableEditing();
        router.refresh();
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({
      title,
      boardId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <input
            ref={inputRef}
            defaultValue={""}
            id="title"
            placeholder="Enter list title"
            name="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input"
          />
          <input className="hidden" value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1">
            <Button className="bg-sky-600">Add List</Button>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="size-5 " />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <Button
        className="w-full rounded-md bg-white/80 hover:bg-white/50  transition p-3 flex items-center font-medium text-sm"
        variant="ghost"
        onClick={() => {
          enableEditing();
        }}
      >
        <Plus className="size-4 mr-4" />
        Add a list
      </Button>
    </ListWrapper>
  );
};
