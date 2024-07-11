"use client";

import { Button } from "@/components/ui/button";
import { Board } from "../../../../../../../prisma/generated/client";
import { useRef, useState } from "react";
import { useAction } from "@/hooks/useAction";
import { UpdateBoardSchema } from "@/actions/update-board/schema";
import { updateBoard } from "@/actions/update-board";
import { toast } from "sonner";

interface BoardTitleProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { execute } = useAction(
    {
      schema: UpdateBoardSchema,
      method: updateBoard,
    },
    {
      onSuccess(data) {
        console.log("Board Success => ", data);
        toast.success(`Board "${data.title}" updated!`);
        setTitle(data.title);
        disableEditing();
      },
      onError(error) {
        console.log("Board error => ", error);
        toast.error(`${error}`);
        disableEditing();
      },
    }
  );

  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        className="flex items-center gap-x-2"
        action={onSubmit}
        ref={formRef}
      >
        <input
          id="title"
          name="title"
          ref={inputRef}
          defaultValue={title}
          onBlur={onBlur}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};
