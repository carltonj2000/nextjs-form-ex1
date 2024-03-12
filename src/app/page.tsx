import { RegistrationForm } from "@/app/RegistrationForm";
import { z } from "zod";
import { schema } from "./registrationSchema";

export default function Home() {
  const onDataAction = async (data: z.infer<typeof schema>) => {
    "use server";
    const parsed = schema.safeParse(data);
    console.log("server Action Embedded", { parsed });
    if (parsed.success) {
      return { message: "User Registered!" };
    } else {
      return {
        message: "Invalid data",
        error: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  const onDataActionFormData = async (formData: FormData) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);
    console.log("server Action Embedded Form Data", { parsed });
    if (parsed.success) {
      return { message: "User Registered!" };
    } else {
      return {
        message: "Invalid data",
        error: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  const onDataActionFormData2 = async (
    prevState: { message: string; error?: Array<string> },
    formData: FormData
  ) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = await schema.safeParseAsync(data);
    console.log("server Action form Action", { parsed });
    if (parsed.success) {
      return { message: "User Registered!" };
    } else {
      const error = parsed.error.issues.map((issue) => issue.message);
      console.log({ error });
      return { message: "Invalid data", error };
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm
        onDataAction={onDataAction}
        onDataActionFormData={onDataActionFormData}
        onDataActionFormData2={onDataActionFormData2}
      />
    </div>
  );
}
