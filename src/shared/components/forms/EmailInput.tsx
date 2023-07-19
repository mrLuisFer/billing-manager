import React from "react";
import { RegisterSchema } from "@/types/register/formSchema";
import { UseFormRegister } from "react-hook-form";
import InputHightlight from "./InputHightlight";

export default function EmailInput({
  register,
}: {
  register: UseFormRegister<RegisterSchema>;
}) {
  return (
    <InputHightlight
      icon="/assets/register/at_icon.svg"
      name="email"
      inputProps={{
        type: "email",
        placeholder: "email@test.com",
        ...register("email"),
      }}
    />
  );
}
