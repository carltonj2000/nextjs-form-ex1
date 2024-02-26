"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { schema } from "./registrationSchema";

export function RegistrationForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex gap-2 w-full flex-wrap">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address</FormDescription>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </Form>
  );
}