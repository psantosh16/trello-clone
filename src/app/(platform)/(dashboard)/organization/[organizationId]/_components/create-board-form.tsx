"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createBoard } from "@/actions/create-board/index";
import { useAction } from "@/hooks/useAction";
import { CreateBoardSchema } from "@/actions/create-board/schema";
import { toast } from "sonner";
import { FormPicker } from "@/components/form/form-picker";
import { PopoverClose } from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const BoardCreationForm = () => {
  const router = useRouter();
  const popButtonRef = useRef(null);
  const { form, isLoading, execute, fieldErrors } = useAction(
    {
      schema: CreateBoardSchema,
      defaultValues: {
        title: "",
      },
      method: createBoard,
    },
    {
      onSuccess: (data) => {
        toast.success("Board created!");
        popButtonRef.current?.click();
        router.push(`/board/${data.id}`);
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  function handleSubmit(formData: FormData) {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  }

  return (
    <div>
      <Form {...form}>
        <form action={handleSubmit} className="grid gap-y-2">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormPicker
                  id="asa"
                  errors={fieldErrors as Record<string, string[]>}
                />
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter Board Title"
                    {...field}
                    className={cn(
                      "",
                      isLoading ? "cursor-not-allowed border-neutral-500" : "",
                    )}
                  />
                </FormControl>
                <PopoverClose asChild ref={popButtonRef}>
                  <Button
                    variant="ghost"
                    className="w-auto h-auto absolute top-1 right-2 text-neutral-600"
                  >
                    <X className="size-4" />
                  </Button>
                </PopoverClose>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="sm"
            type="submit"
            className={cn(isLoading ? "cursor-not-allowed animate-pulse" : "")}
          >
            {isLoading ? "..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BoardCreationForm;
