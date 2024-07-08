"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createBoard } from "@/actions/create-board/index";
import { useAction } from "@/hooks/useAction";
import { CreateBoardSchema } from "@/actions/create-board/schema";
import { toast } from "sonner";

export const BoardCreationForm = () => {
  const { form, isLoading, execute } = useAction(
    {
      schema: CreateBoardSchema,
      defaultValues: {
        title: "",
      },
      method: createBoard,
    },
    {
      onSuccess: (data) => {
        console.log("Board created successfully", data);
        toast.success("Board created successfully");
      },
      onError: (error) => {
        console.error("Error creating board", error);
        toast.error(error);
      },
    }
  );

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(execute)} className="grid gap-y-2">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter Board Title"
                    {...field}
                    className={cn(
                      "",
                      isLoading ? "cursor-not-allowed border-neutral-500" : ""
                    )}
                  />
                </FormControl>
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
