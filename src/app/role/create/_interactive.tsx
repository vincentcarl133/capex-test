"use client";

import * as F from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { type New, createSchema } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { create } from "./actions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";


interface FormProps {
  defaultValues?: New;
}

export function Form({ defaultValues }: FormProps) {

  
  const form = useForm<New>({
    resolver: zodResolver(createSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: New) => {
    console.log(data);
    startTransition(async () => {
      const result = await create(data);
      if (result.success) {
        form.reset();
      }
      toast.message(result.message);
    });
  };
  return (
    <F.Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <F.FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <F.FormItem>
              <F.FormLabel>Role</F.FormLabel>
              <F.FormControl>
                <Input {...field} placeholder="Name" />
              </F.FormControl>
              <F.FormMessage />
            </F.FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit{isPending && "ting"}
        </Button>
      </form>
    </F.Form>
  );
}
