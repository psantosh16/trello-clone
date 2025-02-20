"use client";

import { createCard } from "@/actions/create-card";
import { CreateCardSchema } from "@/actions/create-card/schema";
import { FormTextArea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { on } from "events";
import { Cross, Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(
      {
        schema: CreateCardSchema,
        method: createCard,
      },
      {
        onSuccess: (data) => {
          toast.success(`Card "${data.title}" created.`);
          formRef.current?.reset();
        },
        onError: (error) => {
          toast.error(error);
        },
      }
    );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      console.log({ title, listId, boardId });

      execute({
        title,
        listId,
        boardId,
      });
    };

    if (isEditing) {
      return (
        <form
          className="p-2 flex flex-col gap-y-2"
          ref={formRef}
          action={onSubmit}
        >
          <FormTextArea
            id="title"
            ref={ref}
            onKeyDown={onTextareaKeyDown}
            errors={fieldErrors ? { title: fieldErrors } : undefined}
            placeholder="Enter a title for this card..."
            className="w-full h-20 px-2 py-1.5 text-sm outline-none focus:border-transparent border-transparent"
          />
          <input hidden name="listId" id="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <Button
              className=" w-auto text-center h-auto py-1.5 px-2 justify-start text-white text-sm bg-blue-900"
              size="sm"
              type="submit"
            >
              Add Card
            </Button>
            <Button
              className="w-full h-auto py-1.5 px-2 justify-start  text-sm"
              size="sm"
              variant="ghost"
              onClick={disableEditing}
            >
              <X className="size-5 ml-2" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          className="w-full h-auto py-1.5 px-2 justify-start text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <Plus className="size-4 mr-2" />
          Add Card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
