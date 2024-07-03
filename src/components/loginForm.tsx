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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  email: z.string().email().endsWith("@gmail.com"),
  password: z.string().min(8).max(16),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = formSchema.safeParse(values);
    if (!data.success) return;
    if (form.formState.isSubmitting) setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    console.log(data);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col mt-12 items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn(isLoading ? "cursor-not-allowed animate-pulse" : "")}
          >
            {isLoading ? "..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
