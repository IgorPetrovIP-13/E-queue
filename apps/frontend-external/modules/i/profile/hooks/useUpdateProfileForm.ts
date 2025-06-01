import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { IFormValues } from "../types/types";
import { updateProfileValidationSchemaClient } from "../constants/form-schema";

import { useUpdateProfileInitials } from "./useUpdateProfileInitials";

export const useUpdateProfileForm = () => {
  const { initialValues, isLoading: isInitialDataLoading } =
    useUpdateProfileInitials();
  const { register, handleSubmit, formState, control, reset, trigger } =
    useForm<IFormValues>({
      resolver: zodResolver(updateProfileValidationSchemaClient),
      mode: "onTouched",
			criteriaMode: "all",
      defaultValues: {} as IFormValues
    });

  useEffect(() => {
    if (!isInitialDataLoading && initialValues) {
      reset(initialValues, {
        keepIsValid: true
      });
      trigger();
    }
  }, [isInitialDataLoading, initialValues, reset]);

  return {
    register,
    handleSubmit,
    isInitialDataLoading,
    control,
    formState
  };
};
