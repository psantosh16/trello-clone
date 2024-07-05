"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { createBoard } from "@/actions/create-board";

export const formSchema = z.object({
  title: z.string().min(3).max(12),
});

export const BoardCreationForm = () => {
  /*
   [isLoading, setIsLoading] is a state variable that is used to show a loading spinner when the form is submitting.
  */
  const [isLoading, setIsLoading] = useState(false);

  /*
   [form] is a form object that is created using the useForm hook from react-hook-form.
   The resolver is set to [zodResolver] (formSchema) which is a custom resolver for zod schema.
   The [defaultValues] is set to an object with a title key and an empty string value.
  */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  /*
   It first parses the form data using the [formSchema.safeParse] method.
   If the data is not valid, it returns.
   If the form is submitting, it sets the [isLoading] state to true.
   It then calls the [createBoard] function with the title from the form data.
   Finally, it sets the [isLoading] state to false and resets the form.
  */
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const data = formSchema.safeParse(values);
    if (!data.success) return;
    if (form.formState.isSubmitting) setIsLoading(true);
    createBoard({ title: data.data.title });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-x-3 w-full"
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter board-name"
                    {...field}
                    className={cn(
                      "",
                      isLoading ? "cursor-not-allowed border-neutral-500" : "",
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
            {isLoading ? "..." : "Create Board"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BoardCreationForm;
