import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInValidationSchema } from "@repo/api/services/auth/auth.validation";
import { ISignInReq as IFormValues } from "@repo/api/services/auth/auth.types";

import { initialValues } from "../constants/form-initial";

export const useSignInForm = () => {
  const { register, handleSubmit, formState } = useForm<IFormValues>({
    resolver: zodResolver(signInValidationSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  return { register, handleSubmit, formState };
};
