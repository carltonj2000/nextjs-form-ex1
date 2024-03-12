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
import { useRef } from "react";
import { useFormState } from "react-dom";

import { schema } from "./registrationSchema";

export function RegistrationForm({
  onDataAction,
  onDataActionFormData,
  onDataActionFormData2,
}: {
  onDataAction: (
    data: z.infer<typeof schema>
  ) => Promise<{ message: string; error?: Array<string> }>;
  onDataActionFormData: (
    data: FormData
  ) => Promise<{ message: string; error?: Array<string> }>;
  onDataActionFormData2: (
    prevState: { message: string; error?: Array<string> },
    data: FormData
  ) => Promise<{ message: string; error?: Array<string> }>;
}) {
  const [state, formAction] = useFormState(onDataActionFormData2, {
    message: "",
  });
  const refForm = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
    },
  });

  const onSubmitJson = async (data: z.infer<typeof schema>) => {
    const resp = await fetch("/api/register", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await resp.json();
    console.log({ data, json });
  };

  const onSubmitFormData = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("first", data.first);
    formData.append("last", data.last);
    formData.append("email", data.email);
    const resp = await fetch("/api/registerForm", {
      method: "POST",
      body: formData,
    });
    const json = await resp.json();
    console.log({ data, json });
  };

  const onSubmitServerAction = async (data: z.infer<typeof schema>) => {
    const result = await onDataAction(data);
    console.log({ result });
  };

  const onSubmitServerActionFormData = async (data: z.infer<typeof schema>) => {
    const formData = new FormData();
    formData.append("first", data.first);
    formData.append("last", data.last);
    formData.append("email", data.email);
    const result = await onDataActionFormData(formData);
    console.log({ result });
  };

  return (
    <Form {...form}>
      {/* <form className="space-y-8" onSubmit={form.handleSubmit(onSubmitJson)}> */}
      {/* <form
        className="space-y-8"
        onSubmit={form.handleSubmit(onSubmitFormData)}
      > */}
      {/* <form
        className="space-y-8"
        onSubmit={form.handleSubmit(onSubmitServerAction)}
      > */}
      {/* <form
        className="space-y-8"
        onSubmit={form.handleSubmit(onSubmitServerActionFormData)}
      > */}
      <div>{state?.message}</div>
      <form
        className="space-y-8"
        action={formAction}
        ref={refForm}
        onSubmit={form.handleSubmit(() => refForm?.current?.submit())}
      >
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
