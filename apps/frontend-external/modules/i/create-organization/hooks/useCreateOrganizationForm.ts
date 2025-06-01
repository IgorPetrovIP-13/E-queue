import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { initialValues } from "../constants/form-initials";
import {
  createOrganizationRequestClientValidationSchema,
  CreateOrganizationRequesttClientValidationSchema
} from "@repo/api/services/organization-request/organization-request.validation";

export const useCreateOrganizationForm = () => {
  const { register, handleSubmit, control, formState } =
    useForm<CreateOrganizationRequesttClientValidationSchema>({
      resolver: zodResolver(createOrganizationRequestClientValidationSchema),
      mode: "onTouched",
      defaultValues: initialValues
    });

  return { register, handleSubmit, control, formState };
};
