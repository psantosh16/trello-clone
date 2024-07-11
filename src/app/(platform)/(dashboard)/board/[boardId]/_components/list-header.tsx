"use client";
import { useRef, useState } from "react";
import { List } from "../../../../../../../prisma/generated/client";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";
import { updateList } from "@/actions/update-list";
import { UpdateListSchema } from "@/actions/update-list/schema";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(data.title);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);

  const { execute, isLoading } = useAction(
    {
      schema: UpdateListSchema,
      method: updateList,
    },
    {
      onError(error) {
        toast.error(error);
      },
      onSuccess(data) {
        toast.success(`List "${data.title}" modified.`);
        setTitle(data.title);
        disableEditing();
      },
    }
  );

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    const id = formData.get("id") as string;

    if (title === data.title) {
      return disableEditing();
    }
    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={handleSubmit} className="flex-1 px-[2px]" ref={formRef}>
          <input name="id" id="id" hidden value={data.id} />
          <input name="boardId" id="boardId" hidden value={data.boardId} />
          <input
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            name="title"
            disabled={isLoading}
            placeholder="Enter List Title"
            defaultValue={title}
            className="w-full text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className=" w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={() => {}} />
    </div>
  );
};
