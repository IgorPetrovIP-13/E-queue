import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { initialValues } from "../constants/form-initials";
import { IFormValues, signUpValidationSchema } from "../constants/form-schema";

export const useSignUpForm = () => {
  const { register, handleSubmit, formState } = useForm<IFormValues>({
    resolver: zodResolver(signUpValidationSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  return { register, handleSubmit, formState };
};
